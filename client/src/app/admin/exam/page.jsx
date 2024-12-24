"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { FaFilePdf } from "react-icons/fa"; // Importing a PDF icon from react-icons

export default function AssignExam() {
  const [selectedStream, setSelectedStream] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleStreamChange = (event) => {
    setSelectedStream(event.target.value);
  };

  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedStream || !selectedDate || !selectedTime || !pdfFile) {
      alert("Please complete all fields.");
      return;
    }

    // Process the form data here
    console.log("Stream:", selectedStream);
    console.log("Date:", selectedDate);
    console.log("Time:", selectedTime);
    console.log("PDF File:", pdfFile);
    alert("Exam scheduled successfully!");
  };

  const handleGenerateQuestions = () => {
    if (!pdfFile) {
      alert("Please upload a PDF before generating questions.");
      return;
    }
    alert("AI-generated questions will be processed.");
  };
  const handleDeletePdf = () => {
    setPdfFile(null); // Remove the selected PDF file
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8 bg-gray-50 min-h-screen">
        <div className="mx-auto bg-white rounded-lg shadow-md p-8 space-y-8 h-full">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Assign Exam</h1>

          {/* Stream Selection */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Stream
            </label>
            <select
              value={selectedStream}
              onChange={handleStreamChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a Stream</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="IT">IT</option>
            </select>
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Time Picker */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* PDF Upload */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Upload Exam PDF
            </label>
            <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="text-indigo-600 cursor-pointer hover:underline"
              >
                Click to upload PDF
              </label>
            </div>

            {/* Show PDF Icon and Filename if a PDF is selected */}
            {pdfFile && (
              <div className="mt-4 flex items-center space-x-2">
              <FaFilePdf
                className="text-red-600 cursor-pointer"
                size={24}
                onClick={() => window.open(URL.createObjectURL(pdfFile), "_blank")} // Open PDF in a new tab
              />
              <span className="text-gray-800">{pdfFile.name}</span>
              <button
                onClick={handleDeletePdf}
                className="text-gray-500 hover:text-red-600"
              >
                ✖
              </button>
            </div>
            )}
          </div>

          {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all"
              >
                Submit
              </button>
              <button
                onClick={handleGenerateQuestions}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 transition-all"
              >
                Generate Questions
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
