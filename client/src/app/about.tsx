"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Book, ShieldCheck } from "lucide-react";

export default function About() {
  const [showFAQ, setShowFAQ] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');
  const router = useRouter();

  const handleGetStartedClick = () => {
    router.push("/login");
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'mission':
        return (
          <div className="text-neutral-700 dark:text-neutral-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Our Mission</h3>
            <p>ExamSecure aims to revolutionize the examination process by providing secure, transparent, and efficient tools for automated exam management, leveraging blockchain and AI technologies.</p>
          </div>
        );
      case 'team':
        return (
          <div className="text-neutral-700 dark:text-neutral-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Our Team</h3>
            <p>Our passionate team of educators, technologists, and AI experts is committed to transforming examination management with cutting-edge solutions for institutions worldwide.</p>
          </div>
        );
      case 'impact':
        return (
          <div className="text-neutral-700 dark:text-neutral-300">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Our Impact</h3>
            <p>ExamSecure has enabled institutions to automate 90% of manual exam processes, ensuring error-free scheduling, enhanced security, and data-driven performance analysis.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="overflow-y-auto max-w-4xl w-full mx-auto rounded-none md:rounded-2xl p-6 md:p-12 shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 rounded-lg blur-3xl opacity-40" />

      {/* Cross Button */}
      <button
        className="absolute top-4 right-4 text-neutral-800 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-700 rounded-full p-2 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white transition-colors shadow-lg"
        onClick={() => window.location.href = '/'}
        aria-label="Close"
      >
        ✖
      </button>

      <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200 mb-6">
        About <span className="text-blue-600">ExamSecure</span>
      </h2>

      <div className="my-8 space-y-6">
        <div className="mb-6">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            ExamSecure is a cutting-edge platform designed to streamline the examination process, offering automated room allotment, secure invigilation, and intelligent performance analytics for students and institutions.
          </p>
        </div>

        <div className="flex justify-between mb-6">
          <button 
            onClick={() => setActiveTab('mission')}
            className={`flex items-center ${activeTab === 'mission' ? 'text-blue-600 font-bold' : 'text-neutral-500'} hover:text-blue-600`}
          >
            <ShieldCheck className="mr-2" size={30} /> Mission
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`flex items-center ${activeTab === 'team' ? 'text-blue-600 font-bold' : 'text-neutral-500'} hover:text-blue-600`}
          >
            <Users className="mr-2" size={30} /> Team
          </button>
          <button 
            onClick={() => setActiveTab('impact')}
            className={`flex items-center ${activeTab === 'impact' ? 'text-blue-600 font-bold' : 'text-neutral-500'} hover:text-blue-600`}
          >
            <Book className="mr-2" size={30} /> Impact
          </button>
        </div>

        <div className="mb-4 space-y-4">
          {renderTabContent()}
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-blue-600 mb-3 text-xl">Key Features</h3>
          <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>Automated Room Allotment and Timetable Generation</li>
            <li>Blockchain-Based Secure Invigilation</li>
            <li>AI-Driven Performance Analytics</li>
            <li>Real-Time Exam Monitoring</li>
          </ul>
        </div>

        {/* Interactive Section */}
        <div className="relative mb-8 group">
          <button
            onClick={handleGetStartedClick}
            className="bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 py-3 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            Secure Your Exams &rarr;
          </button>
        </div>

        {/* FAQ Section */}
        <div className="mb-6">
          <h3 className="font-semibold text-blue-600 text-xl cursor-pointer flex items-center justify-between" onClick={() => setShowFAQ(!showFAQ)}>
            Frequently Asked Questions
            <span className="transform transition-transform duration-300">
              {showFAQ ? "▲" : "▼"}
            </span>
          </h3>
          {showFAQ && (
            <div className="mt-4 space-y-3">
              <div>
                <h4 className="font-medium text-neutral-700 dark:text-neutral-300">What is ExamSecure?</h4>
                <p className="text-neutral-600 dark:text-neutral-400">A platform to automate and secure the entire examination process using blockchain and AI technologies.</p>
              </div>
              <div>
                <h4 className="font-medium text-neutral-700 dark:text-neutral-300">How does it work?</h4>
                <p className="text-neutral-600 dark:text-neutral-400">It automates room allotment, schedules exams, monitors exams in real-time, and provides performance insights using advanced analytics.</p>
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
