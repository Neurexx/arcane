import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/admin/dashboard";
import RoutineCreator from "./admin/routine";
import AssignExams from "./admin/exam";
import InvigilationInfo from "./admin/InvigilationInfo";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/routine" element={<RoutineCreator />} />
            <Route path="/admin/exam" element={<AssignExams />} />
            <Route path="/admin/invigilation-info" element={<InvigilationInfo />} />
            {/* Add other routes if needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
