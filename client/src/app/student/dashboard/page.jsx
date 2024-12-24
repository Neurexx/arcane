"use client";

import React, { useState, useEffect } from "react";
import { Award, Users, Clock, BookOpen, GraduationCap, Bell } from "lucide-react";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState("Monday");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scheduleData = {
    Monday: [
      { time: "09:00 AM", subject: "Advanced Mathematics", professor: "Dr. Smith", room: "Room 101" },
      { time: "11:00 AM", subject: "Computer Science", professor: "Prof. Johnson", room: "Lab 3" },
      { time: "02:00 PM", subject: "Physics", professor: "Dr. Williams", room: "Room 205" },
    ],
    Tuesday: [
      { time: "10:00 AM", subject: "Data Structures", professor: "Dr. Brown", room: "Lab 2" },
      { time: "01:00 PM", subject: "Digital Electronics", professor: "Prof. Davis", room: "Room 304" },
    ],
  };

  const studentInfo = {
    name: "Alex Johnson",
    rollNumber: "CS2024001",
    stream: "Computer Science",
    section: "A",
    year: "2nd Year",
    semester: "4th Semester",
    cgpa: "3.8",
  };

  const upcomingExams = [
    { subject: "Data Structures", date: "2024-12-28", time: "10:00 AM" },
    { subject: "Advanced Mathematics", date: "2024-12-30", time: "02:00 PM" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Student Profile Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fade-in">
        <div className="flex items-start justify-between">
          <div className="flex space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                {studentInfo.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{studentInfo.name}</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  <span>{studentInfo.stream}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  <span>{studentInfo.semester}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span>Section {studentInfo.section}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>CGPA: {studentInfo.cgpa}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Roll Number</div>
            <div className="font-mono font-bold text-blue-600">{studentInfo.rollNumber}</div>
          </div>
        </div>
      </div>

      {/* Time and Schedule Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Time Display */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Current Time</h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-gray-500 mt-2">
            {currentTime.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Day Selector and Schedule */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 animate-fade-in-up">
          <div className="p-4 border-b">
            <div className="flex space-x-2 overflow-x-auto">
              {Object.keys(scheduleData).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedDay === day ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 space-y-4">
            {scheduleData[selectedDay].map((schedule, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-20 text-sm font-semibold text-gray-600">
                  {schedule.time}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{schedule.subject}</div>
                  <div className="text-sm text-gray-500">
                    {schedule.professor} • {schedule.room}
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Exams */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Upcoming Exams</h3>
          <Bell className="w-5 h-5 text-blue-500" />
        </div>
        <div className="space-y-4">
          {upcomingExams.map((exam, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100"
            >
              <div>
                <div className="font-semibold">{exam.subject}</div>
                <div className="text-sm text-gray-600">
                  {new Date(exam.date).toLocaleDateString()} at {exam.time}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600">
                  {Math.ceil((new Date(exam.date) - currentTime) / (1000 * 60 * 60 * 24))} days left
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
  return <div>Dashboard</div>;
};

export default Dashboard;
