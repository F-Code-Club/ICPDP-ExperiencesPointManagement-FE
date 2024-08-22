import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Background from "../components/Background";
import Sidebar from "../components/Sidebar";
import useSetTitle from "../components/DataTable/hooks/useSetTitle";
const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { pageTitle } = useSetTitle(window.location.pathname);

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
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title={pageTitle || ""}
          />
        </div>
        <div className="flex h-full bg-light-text-color rounded-lg mx-[16px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
