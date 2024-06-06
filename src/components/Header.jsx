import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const Header = ({ toggleSidebar, isSidebarOpen, title }) => {
  return (
    <div
      className={`bg-transparent flex h-[120px] justify-start items-center p-6 gap-2 self-stretch w-full`}
      style={{
        marginLeft: isSidebarOpen ? "24px" : "0",
        transition: "padding-left 0.3s ease",
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          top: "40px",
          left: "20px",
        }}
      >
        <MenuIcon style={{ color: isSidebarOpen ? "white" : "black" }} />
      </IconButton>
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default Header;
