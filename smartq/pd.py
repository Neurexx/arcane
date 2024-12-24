import PyPDF2

def extract_text_from_pdf(pdf_path):
    """Extracts text content from a PDF file."""
    text_by_page = {}
    
    try:
        # Open the PDF file
        with open(pdf_path, 'rb') as file:
            # Create PDF reader object
            pdf_reader = PyPDF2.PdfReader(file)
            
            # Get number of pages
            num_pages = len(pdf_reader.pages)
            
            full_text = ""
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                full_text += page.extract_text() + "\n"
                print(full_text)
                
            return full_text.strip()
        
    except Exception as e:
        raise Exception(f"An error occurred while processing the PDF: {str(e)}")
    

print(extract_text_from_pdf("lemh101.pdf"))