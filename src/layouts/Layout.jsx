import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PersistLogin from "../components/Auth/PersistLogin";
import Main from "../components/Main";
import Header from "../components/Header";
import Background from "../components/Background";
import Sidebar from "../components/Sidebar";

const Layout = ({title, children}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="relative flex min-h-[100%] w-full gap-4">
      <Background />
      <div className={`${isSidebarOpen ? "hidden" : ""} w-[17%]`}>
        <Sidebar />
      </div>
      <div className={`flex flex-col flex-grow w-[80%] gap-4 z-10`}>
        <div>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} title={title} />
        </div>
        <div className="flex h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
