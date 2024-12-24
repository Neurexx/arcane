"use client";
import React from "react";
import ScheduleRoutine from "@/components/ScheduleRoutine";
import Sidebar from "@/components/Sidebar";

function RoutineCreator() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <ScheduleRoutine teacherName="Dr. Smith" />
      </div>
    </div>
  );
}

export default RoutineCreator;
