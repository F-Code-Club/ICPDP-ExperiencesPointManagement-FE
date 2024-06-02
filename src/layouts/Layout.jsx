import React, { useState } from "react";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Background from "../components/Background";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
      <div className="relative flex h-full w-full gap-4">
        <Background/>
        <div className={`${isSidebarOpen ? "hidden" : ""}`}>
          <Sidebar />
        </div>
        <div className={`flex flex-col flex-grow w-full gap-4 z-10`}>
          <div>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          </div>
          <div className="flex flex-grow h-screen">
            <Main/> 
          </div>
        </div>
      </div>
  );
};

export default Layout;
