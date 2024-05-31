import React, { useState } from "react";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
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
  );
};

export default Layout;
