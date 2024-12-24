// Sidebar.js
"use client"
import Link from 'next/link';
import {JSX} from "react";
import { usePathname, useRouter } from 'next/navigation';
import { Home, FileText, Calendar, HelpCircle, BookOpen } from 'lucide-react';

// Define the structure of each section item
interface Section {
  name: string;
  icon: JSX.Element; // JSX element for the icon
  link: string;
}

const Sidebar = () => {
  const pathname = usePathname();

  // Define the sections of the sidebar
  const sections: Section[] = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, link: 'student/dashboard' },
    { name: 'Online Exams', icon: <FileText className="w-5 h-5" />, link: 'student/online' },
    { name: 'Materials', icon: <BookOpen className="w-5 h-5" />, link: '/#' },
    { name: 'Scheduled', icon: <Calendar className="w-5 h-5" />, link: '/scheduled' },
    { name: 'Doubts', icon: <HelpCircle className="w-5 h-5" />, link: '/doubt' },
  ];

  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4 text-2xl font-semibold">Student Portal</div>
      <div className="space-y-4 mt-8">
        {sections.map((section) => (
          <Link key={section.name} href={section.link}>
            <div
              className={`flex items-center space-x-4 px-4 py-2 rounded-lg transition-colors ${
                  pathname === section.link
                  ? 'bg-blue-600'
                  : 'hover:bg-gray-700'
              }`}
            >
              {section.icon}
              <span>{section.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
