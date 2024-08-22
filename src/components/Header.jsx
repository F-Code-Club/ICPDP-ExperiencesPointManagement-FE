import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
//eslint-disable-next-line
const Header = ({ toggleSidebar, title }) => {
  return (
    <div
      className={`bg-light-text-color flex h-[91px] rounded-lg justify-start items-center p-6 gap-2 self-stretch w-full mt-[16px] mx-[16px]`}
      style={{
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
        <MenuIcon style={{ color: "black" }} />
      </IconButton>
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
    </div>
  );
};

export default Header;
