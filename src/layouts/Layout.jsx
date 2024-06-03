import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PersistLogin from "../components/Auth/PersistLogin";
import Main from "../components/Main";
import Header from "../components/Header";
import Background from "../components/Background";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="relative flex min-h-[100%] w-full gap-4">
      <Background />
      <div className={`${isSidebarOpen ? "hidden" : ""}`}>
        <Sidebar />
      </div>
      <div className={`flex flex-col flex-grow w-screen gap-4 z-10`}>
        <div>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="flex h-full">
          <Main />
        </div>
      </div>
    </div>
  );
};

export default Layout;
