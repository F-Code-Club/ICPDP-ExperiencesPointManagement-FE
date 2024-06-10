import React, { useState } from "react";
import { Outlet, } from "react-router-dom";
import Main from "../components/Main";
import Header from "../components/Header";
import Background from "../components/Background";
import Sidebar from "../components/Sidebar";

const Layout = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex min-h-[100%] w-full gap-4">
      <Background />
      <div className={`${isSidebarOpen ? "hidden" : ""} w-[17%]`}>
        <Sidebar setTitle={setTitle}/>
      </div>
      <div className={`flex flex-col flex-grow w-[80%] gap-4 z-10`}>
        <div>
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title={title}
          />
        </div>
        <div className="flex h-full">
          <Outlet title={title}/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
