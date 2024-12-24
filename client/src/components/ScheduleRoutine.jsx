import React, { useState, useEffect } from "react";

const ScheduleRoutine = ({ teacherName }) => {
  // Mock schedule data (replace with MongoDB fetch logic)
  const scheduleData = [
    {
      teacher: "Dr. Smith",
      day: "Monday",
      course: "DSA-AIML-1001",
      batch: "AIML 1st Year",
      room: "Room 101",
      time: "9:00 AM - 10:00 AM",
    },
    {
      teacher: "Dr. Smith",
      day: "Monday",
      course: "DSA-CSE-2001",
      batch: "CSE 2nd Year",
      room: "Room 102",
      time: "11:00 AM - 12:00 PM",
    },
    {
      teacher: "Dr. Smith",
      day: "Wednesday",
      course: "DSA-AIML-1001",
      batch: "AIML 1st Year",
      room: "Room 103",
      time: "10:00 AM - 11:00 AM",
    },
    {
      teacher: "Dr. Smith",
      day: "Friday",
      course: "DSA-CSE-2001",
      batch: "CSE 2nd Year",
      room: "Room 105",
      time: "1:00 PM - 2:00 PM",
    },
    {
      teacher: "Dr. Taylor",
      day: "Monday",
      course: "Python-CSE-1001",
      batch: "CSE 1st Year",
      room: "Room 201",
      time: "9:00 AM - 10:00 AM",
    },
  ];

  // Filter schedule data for the logged-in teacher
  const [teacherSchedule, setTeacherSchedule] = useState([]);

  useEffect(() => {
    // Filter schedule data for the specific teacher
    const filteredSchedule = scheduleData.filter(
      (entry) => entry.teacher === teacherName
    );
    setTeacherSchedule(filteredSchedule);
  }, [teacherName]);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Weekly Schedule for {teacherName}
        </h2>
        {teacherSchedule.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Day</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Batch</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Room</th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Timing
                </th>
              </tr>
            </thead>
            <tbody>
              {teacherSchedule.map((entry, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="border border-gray-300 px-4 py-2">{entry.day}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.course}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.batch}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.room}</td>
                  <td className="border border-gray-300 px-4 py-2">{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No schedule available for this teacher.</p>
        )}
      </div>
    </div>
  );
};

export default ScheduleRoutine;
