import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div
      className={`bg-white px-6 rounded-md py-12 flex justify-between w-full ${
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
            top: "16px",
            left: "16px",
          }}
        >
          <MenuIcon style={{ color: "black" }} />
        </IconButton>
      )}
    </div>
  );
};

export default Header;
