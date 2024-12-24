"use client";
import { useState } from "react";

export default function DoubtPage() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const reply = await fetch("/api/submit-question", {
        method: "POST",
        body: JSON.stringify({ question }),
        headers: { "Content-Type": "application/json" },
      });

      if (!reply.ok) {
        throw new Error("Failed to submit question");
      }

      const data = await reply.json();
      setResponse(data.response);
      setPdfUrl(data.pdfUrl);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doubt-page">
      <div className="content">
        <h2>Ask Your Doubt</h2>
        <p className="subtitle">Get professional answers to your questions quickly and easily.</p>
        <form onSubmit={handleSubmit} className="form">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            rows={5}
            required
            className="textarea"
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Question"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {response && !loading && (
          <div className="response">
            <h3>Teacher's Reply</h3>
            <p>{response}</p>

            {pdfUrl && (
              <a href={pdfUrl} download className="download-link">
                <button className="download-btn">Download PDF Response</button>
              </a>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .doubt-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f7fa, #80deea);
          font-family: "Roboto", sans-serif;
        }
        .content {
          background: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
        }
        h2 {
          color: #00796b;
          font-size: 24px;
          margin-bottom: 10px;
          text-align: center;
        }
        .subtitle {
          color: #555;
          font-size: 16px;
          margin-bottom: 20px;
          text-align: center;
        }
        .form {
          display: flex;
          flex-direction: column;
        }
        .textarea {
          width: 100%;
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
          resize: none;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .textarea:focus {
          border-color: #00796b;
          outline: none;
          box-shadow: 0 0 5px rgba(0, 121, 107, 0.5);
        }
        .submit-btn {
          padding: 12px;
          font-size: 18px;
          background: #00796b;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .submit-btn:hover {
          background: #004d40;
        }
        .submit-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .response {
          margin-top: 20px;
          padding: 15px;
          border-radius: 8px;
          background: #f1f8e9;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .response h3 {
          color: #33691e;
          font-size: 20px;
        }
        .download-link {
          text-decoration: none;
        }
        .download-btn {
          margin-top: 10px;
          padding: 10px;
          font-size: 16px;
          background: #33691e;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .download-btn:hover {
          background: #1b5e20;
        }
        .error-message {
          margin-top: 10px;
          color: #d32f2f;
          font-size: 14px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
