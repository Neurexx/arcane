"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, BookOpen, Clock, LogOut, Leaf } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);  // State for sidebar collapse

  const menuItems = [
    { name: "Dashboard", icon: Leaf, route: "/admin/dashboard" },
    { name: "Schedule Routine", icon: Calendar, route: "/admin/routine" },
    { name: "Assign Exams", icon: BookOpen, route: "/admin/exam" },
    { name: "Invigilation Info", icon: Clock, route: "/admin/invigilation-info" },
  ];

  return (
    <div
      className={`h-screen w-${isCollapsed ? "16" : "64"} bg-indigo-800 text-white p-6 transition-all`}
    >
      <div className="mb-8 flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${isCollapsed ? "hidden" : ""}`}>TeachPortal</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white p-2 hover:bg-indigo-700 rounded-lg"
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.route}
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              router.pathname === item.route ? "bg-indigo-600" : "hover:bg-indigo-700"
            } transition-colors`}
          >
            <item.icon className="w-5 h-5" />
            <span className={`${isCollapsed ? "hidden" : ""}`}>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6">
        <Link
          href="/logout"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className={`${isCollapsed ? "hidden" : ""}`}>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
