import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import GroupsIcon from "@mui/icons-material/Groups";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  return (
    <>
      <div
        className={`w-64 bg-sidebar h-full text-black flex flex-col justify-between rounded-lg ${
          open ? "border-gray-700" : ""
        } `}
      >
        <div>
          <div className="flex items-center p-4 cursor-pointer"></div>
          <div className="flex flex-col items-center pt-8 pb-2">
            <AccountCircleIcon
              sx={{ fontSize: "5rem" }}
              alt="User Avatar"
              src="/static/images/avatar/1.jpg"
              className="mb-2"
              style={{ color: "black" }}
            />
            <h2 className="text-base font-bold text-black">Admin's name</h2>
            <p className="text-primary text-xs font-medium">ADMINISTRATOR</p>
          </div>
          <ul className="flex flex-col p-2 text-sm space-y-2 mt-4 text-black">
            <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded p-2"
                    : "flex items-center p-2"
                }
              >
                <HomeIcon className="mr-2" sx={{ fontSize: "20px" }} />
                Trang chủ
              </NavLink>
            </li>
            <li className="flex flex-col">
              <div
                className="flex items-center p-2 border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <SpaceDashboardIcon
                  className="mr-2"
                  sx={{ fontSize: "18px" }}
                />
                <div>Bảng điểm</div>
                {open ? (
                  <ArrowDropDownIcon
                    className="ml-auto"
                    sx={{ fontSize: "18px" }}
                  />
                ) : (
                  <ArrowRightIcon
                    className="ml-auto"
                    sx={{ fontSize: "18px" }}
                  />
                )}
              </div>
              {open && (
                <ul className="pl-8 space-y-2">
                  <li className="border border-transparent mt-1 hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer transition-all duration-200">
                    <NavLink
                      to="/transcripts/experience-point"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded p-2"
                          : "flex items-center p-2"
                      }
                    >
                      <AssignmentTurnedInIcon
                        className="mr-2"
                        sx={{ fontSize: "18px" }}
                      />
                      Bảng điểm phong trào
                    </NavLink>
                  </li>

                  <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer transition-all duration-200">
                    <NavLink
                      to="/transcripts/final-point"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded p-2"
                          : "flex items-center p-2"
                      }
                    >
                      <AssignmentIcon
                        className="mr-2"
                        sx={{ fontSize: "18px" }}
                      />
                      Bảng điểm tổng kết
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="flex flex-col">
              <div
                className="flex items-center p-2 border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer"
                onClick={() => setOpen1(!open1)}
              >
                <SettingsIcon className="mr-2" sx={{ fontSize: "18px" }} />
                <div>Cấu hình</div>
                {open1 ? (
                  <ArrowDropDownIcon
                    className="ml-auto"
                    sx={{ fontSize: "18px" }}
                  />
                ) : (
                  <ArrowRightIcon
                    className="ml-auto"
                    sx={{ fontSize: "18px" }}
                  />
                )}
              </div>
              {open1 && (
                <ul className="pl-8 space-y-2">
                  <li className="border border-transparent mt-1 hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer transition-all duration-200">
                    <NavLink
                      to="/settings/students"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded p-2"
                          : "flex items-center p-2"
                      }
                    >
                      <PersonSearchIcon
                        className="mr-2"
                        sx={{ fontSize: "18px" }}
                      />
                      Quản lí sinh viên
                    </NavLink>
                  </li>
                  <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer transition-all duration-200">
                    <NavLink
                      to="/settings/clubs"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded p-2"
                          : "flex items-center p-2"
                      }
                    >
                      <GroupsIcon className="mr-2" sx={{ fontSize: "18px" }} />
                      Quản lí câu lạc bộ
                    </NavLink>
                  </li>
                  <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer transition-all duration-200">
                    <NavLink
                      to="/settings/departments"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded p-2"
                          : "flex items-center p-2"
                      }
                    >
                      <RoomPreferencesIcon
                        className="mr-2"
                        sx={{ fontSize: "18px" }}
                      />
                      Quản lí phòng ban
                    </NavLink>
                  </li>
                  <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer transition-all duration-200">
                    <NavLink
                      to="/settings/semesters"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded p-2"
                          : "flex items-center p-2"
                      }
                    >
                      <CalendarMonthIcon
                        className="mr-2"
                        sx={{ fontSize: "18px" }}
                      />
                      Quản lí kì học
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div>
          <hr className="border-slate-950 ml-4 mr-4" />
          <div className="flex items-center text-sm text-black p-4 border border-transparent hover:bg-primary-100 hover:shadow-xl rounded cursor-pointer">
            <LogoutIcon className="mr-2" sx={{ fontSize: "18px" }} />
            <NavLink to="/login">Đăng xuất</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
