"use client"
import React from 'react';
import { Users, BookOpen, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardCard from '@/components/DashboardCard';
import UpcomingSchedule from '@/components/UpcomingSchedule';

function App() {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, Professor!</h1>
          <p className="text-gray-600">Here's what's happening with your classes today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Total Students"
            value="156"
            icon={Users}
            bgColor="bg-blue-600"
          />
          <DashboardCard
            title="Upcoming Exams"
            value="3"
            icon={BookOpen}
            bgColor="bg-indigo-600"
          />
          <DashboardCard
            title="Hours Today"
            value="6.5"
            icon={Clock}
            bgColor="bg-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingSchedule />
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-indigo-50 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors">
                Schedule New Class
              </button>
              <button className="p-4 bg-purple-50 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors">
                Create Exam
              </button>
              <button className="p-4 bg-blue-50 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                View Attendance
              </button>
              <button className="p-4 bg-pink-50 rounded-lg text-pink-700 hover:bg-pink-100 transition-colors">
                Send Announcement
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;