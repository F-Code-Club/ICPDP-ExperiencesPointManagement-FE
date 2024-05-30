import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="flex bg-black h-screen w-screen p-6">
                <div className={`pr-4 ${isSidebarOpen ? "hidden" : ""}`}>
                  <Sidebar />
                </div>
                <div
                  className={`flex flex-col flex-grow ${
                    isSidebarOpen ? "" : "ml-64"
                  } w-full `}
                >
                  <div>
                    <Header toggleSidebar={toggleSidebar} />
                  </div>
                  <div className="flex flex-grow mt-4">
                    <Main />
                  </div>
                </div>
              </div>
            </>
          }
        />
        <Route
          path="movement-point"
          element={
            <>
              <div className="flex bg-black h-screen w-screen p-6">
                <div className={`pr-4 ${isSidebarOpen ? "hidden" : ""}`}>
                  <Sidebar />
                </div>
                <div
                  className={`flex flex-col flex-grow ${
                    isSidebarOpen ? "" : "ml-64"
                  } w-full `}
                >
                  <div>
                    <Header toggleSidebar={toggleSidebar} />
                  </div>
                </div>
              </div>
            </>
          }
        />
        <Route path="final-grade" element={<div>Điểm tổng kết</div>} />
        <Route
          path="student-management"
          element={<div>Quản lí sinh viên</div>}
        />
        <Route path="club-management" element={<div>Quản lí câu lạc bộ</div>} />
        <Route
          path="department-management"
          element={<div>Quản lí phòng ban</div>}
        />
        <Route path="semester-management" element={<div>Quản lí kì học</div>} />
      </Routes>
    </Router>
  );
}

export default App;
