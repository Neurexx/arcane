import React from 'react';

const UpcomingSchedule = () => {
  const schedules = [
    {
      subject: "Mathematics 101",
      time: "09:00 AM - 10:30 AM",
      room: "Room 204",
      date: "Today"
    },
    {
      subject: "Physics Lab",
      time: "11:00 AM - 12:30 PM",
      room: "Lab 102",
      date: "Today"
    },
    {
      subject: "Computer Science",
      time: "02:00 PM - 03:30 PM",
      room: "Room 305",
      date: "Tomorrow"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Upcoming Schedule</h2>
      <div className="space-y-4">
        {schedules.map((schedule, index) => (
          <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{schedule.subject}</h3>
                <p className="text-sm text-gray-600">{schedule.time}</p>
                <p className="text-sm text-gray-600">{schedule.room}</p>
              </div>
              <span className="text-sm font-medium text-indigo-600">{schedule.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSchedule;