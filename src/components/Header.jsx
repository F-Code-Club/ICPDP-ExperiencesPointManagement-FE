import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div
      className={`bg-transparent flex h-[120px] flex-col justify-center items-center p-6 gap-2 self-stretch w-full`}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          top: "40px",
          left: "48px",
        }}
      >
        <MenuIcon style={{ color: isSidebarOpen ? "white" : "black" }} />
      </IconButton>
    </div>
  );
};

export default Header;
