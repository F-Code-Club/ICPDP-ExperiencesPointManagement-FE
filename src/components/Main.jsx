import React from "react";
import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <div className="bg-transparent flex p-6 rounded-r-lg flex-col justify-center items-center gap-2 flex-[1_0_0] self-stretch text-white">
      <Outlet />
    </div>
  );
};

export default Main;
