import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
const Header = ({ toggleSidebar, isSidebarOpen }) => {
  
  return (
    <div
      className={`bg-white px-6 rounded-lg py-12 flex h-[100px] flex-col justify-center items-center gap-2 self-stretch w-full  ${
        isSidebarOpen ? "hidden" : ""
      }`}
    >
      {!isSidebarOpen && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          style={{
            position: "absolute",
            top: "40px",
            left: "48px",
            padding: "8px"
          }}
        >
          <MenuIcon style={{ color: "black" }} />
        </IconButton>
      )}
    </div>
  );
};

export default Header;
