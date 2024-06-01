import React, { useState } from "react";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
      <div className="flex bg-black h-full w-full p-6 gap-4">
        <div className={`${isSidebarOpen ? "hidden" : ""}`}>
          <Sidebar />
        </div>
        <div className={`flex flex-col flex-grow w-full gap-4`}>
          <div>
            <Header toggleSidebar={toggleSidebar} />
          </div>
          <div className="flex flex-grow">
            <Main/> 
          </div>
        </div>
      </div>
  );
};

export default Layout;
