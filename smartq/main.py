from flask import Flask, request, jsonify
import os
import tempfile
import google.generativeai as genai
import PyPDF2
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime
import json

load_dotenv()

app = Flask(__name__)

# Configure Google Gemini
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-2.0-flash-exp")

# Configure MongoDB client
mongo_client = MongoClient(os.environ["MONGO_URI"])
db = mongo_client["exam_system"]
exams_collection = db["exams"]

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            full_text = "".join(page.extract_text() for page in pdf_reader.pages)
            return full_text.strip()
    except Exception as e:
        raise Exception(f"An error occurred while processing the PDF: {str(e)}")

def generate_with_ai(text_content, no_of_q):
    prompt = f"""
    Generate {no_of_q} multiple-choice questions (MCQs) from the following text. 
    Provide 4 options (A, B, C, D) and indicate the correct answer.
    Include a field "marks" with default value 1 for each question.
    Format the output as a JSON array of objects, where each object has the following structure:
    {{
      "question": "The MCQ question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct option (A, B, C, or D)",
      "marks": 1
    }}

    Text:
    {text_content}
    """
    try:
        response = model.generate_content(prompt)
        return response.text[8:-4]
    except Exception as e:
        return f"Error generating MCQs: {e}"

@app.route('/generateWithAI', methods=['POST'])
def create_exam():
    if 'pdf' not in request.files:
        return jsonify({"error": "No PDF file provided"}), 400

    pdf_file = request.files['pdf']

    if pdf_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not pdf_file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Invalid file format. Only PDF files are allowed."}), 400

    try:
        no_of_q = int(request.form.get("noOfQ"))
        duration = int(request.form.get("duration"))
        scheduled_time= request.form.get("scheduledTime")
        # scheduled_time = datetime.strptime(scheduled_time_str, "%Y-%m-%d %H:%M:%S")

        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
            temp_pdf_path = temp_pdf.name
            pdf_file.save(temp_pdf_path)

        extracted_text = extract_text_from_pdf(temp_pdf_path)
        os.remove(temp_pdf_path)

        mcq_json = generate_with_ai(extracted_text, no_of_q)
      
        if mcq_json.startswith("Error"):
            return jsonify({"error": mcq_json}), 500

        try:
            mcqs = json.loads(mcq_json)
        except json.JSONDecodeError as decode_error:
            return jsonify({"error": f"Failed to decode AI response: {decode_error}"}), 500

        exam = {
            "mcqs": mcqs,
            "duration": duration,
            "scheduledTime": scheduled_time,
            "createdAt": datetime.utcnow()
        }

        result = exams_collection.insert_one(exam)
        return jsonify({"message": "Exam created successfully", "examId": str(result.inserted_id)}), 201

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
