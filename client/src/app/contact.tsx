"use client";

import React, { useState } from "react";

export default function Contact() {
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <div className="max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-6 md:p-12 shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 rounded-lg blur-3xl opacity-40" />

      {/* Cross Button */}
      <button
        className="absolute top-4 right-4 text-neutral-800 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-700 rounded-full p-2 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white transition-colors shadow-lg"
        onClick={() => (window.location.href = "/")}
        aria-label="Close"
      >
        ✖
      </button>

      <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200 mb-6">
        Contact <span className="text-blue-600">ExamSecure</span>
      </h2>

      <div className="my-8 space-y-6">
        <div className="mb-6">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            We're here to assist you! Reach out to us for support, inquiries, or to learn more about how ExamSecure can simplify examination management and enhance security.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-blue-600 mb-3 text-xl">Contact Information</h3>
          <ul className="space-y-4 text-neutral-700 dark:text-neutral-300">
            <li>
              <span className="font-medium text-blue-600">Email:</span>{" "}
              <a href="mailto:support@examsecure.com" className="hover:underline">
                support@examsecure.com
              </a>
            </li>
            <li>
              <span className="font-medium text-blue-600">Phone:</span>{" "}
              <a href="tel:+911234567890" className="hover:underline">
                +91 123-456-7890
              </a>
            </li>
            <li>
              <span className="font-medium text-blue-600">Address:</span>{" "}
              Heritage Institute of Technology, Kolkata, India
            </li>
          </ul>
        </div>

        {/* Interactive Section */}
        <div className="relative mb-8 group">
          <button
            onClick={() => alert("Opening Contact Form...")}
            className="bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            Send Us a Message &rarr;
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mb-6">
          <h3
            className="font-semibold text-blue-600 text-xl cursor-pointer flex items-center justify-between"
            onClick={() => setShowFAQ(!showFAQ)}
          >
            Frequently Asked Questions
            <span className="transform transition-transform duration-300">
              {showFAQ ? "▲" : "▼"}
            </span>
          </h3>
          {showFAQ && (
            <div className="mt-4 space-y-3">
              <div>
                <h4 className="font-medium text-neutral-700 dark:text-neutral-300">
                  How can I get in touch with you?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400">
                  You can contact us via email, phone, or by filling out our online contact form.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-neutral-700 dark:text-neutral-300">
                  Where are you located?
                </h4>
                <p className="text-neutral-600 dark:text-neutral-400">
                  We are located at Heritage Institute of Technology, Kolkata, India.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        className="relative bg-gradient-to-br from-gray-800 to-gray-600 text-white w-full py-3 rounded-md font-medium hover:scale-105 transition-transform shadow-lg"
        onClick={() => (window.location.href = "/")}
      >
        Back to Home &rarr;
        <BottomGradient />
      </button>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
