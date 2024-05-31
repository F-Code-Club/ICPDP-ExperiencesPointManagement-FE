import React from "react";
import { Outlet } from "react-router-dom";
const Main = () => {
  return (
    <div className="bg-sidebar flex p-4 rounded-lg flex-col justify-center items-center gap-2 flex-[1_0_0] self-stretch text-black">
      <Outlet />
    </div>
  );
};

export default Main;
