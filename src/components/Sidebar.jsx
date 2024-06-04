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
import CollapsibleItem from "./CollapsibleItem/CollapsibleItem";

const Sidebar = () => {
  return (
    <>
      <div
        className={`w-[339px] p-6 bg-sidebar min-h-[100%] text-black flex flex-col justify-between z-10 relative gap-4`}
      >
        <div className="flex flex-col gap-6 h-full w-full">
          <div className="flex items-center p-4 cursor-pointer"></div>
          <div className="flex flex-col justify-center items-center gap-2 py-6 self-stretch">
            <AccountCircleIcon
              sx={{ fontSize: "100px" }}
              alt="User Avatar"
              src="/static/images/avatar/1.jpg"
              className="mb-2"
              style={{ color: "black" }}
            />
            <div className="flex flex-col justify-center items-center gap-0.5">
              <h2 className="text-base font-bold text-black">Admin's name</h2>
              <p className="text-primary text-xs font-medium">ADMINISTRATOR</p>
            </div>
          </div>
          <ul className="flex flex-col justify-center gap-3 text-sm text-black">
            <li className=" border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer gap-2 ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded py-3 px-2"
                    : "flex items-center py-3 px-2"
                }
              >
                <HomeIcon
                  className="flex gap-2 mr-2"
                  sx={{ fontSize: "19px" }}
                />
                <span className="flex flex-col justify-center text-base not-italic leading-5 tracking-[0.016px] w-[80.667px]">
                  Trang chủ
                </span>
              </NavLink>
            </li>
            <CollapsibleItem title="Bảng điểm" icon={SpaceDashboardIcon}>
              <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer gap-2 self-stretch">
                <NavLink
                  to="/transcripts/experience-point"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded py-3 px-2"
                      : "flex items-center py-3 px-2"
                  }
                >
                  <AssignmentTurnedInIcon
                    className="flex gap-2 mr-2"
                    sx={{ fontSize: "19px" }}
                  />
                  <div className="flex flex-col justify-center text-base not-italic leading-5 tracking-[0.016px]">
                    Bảng điểm phong trào
                  </div>
                </NavLink>
              </li>
              <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer gap-2 self-stretch">
                <NavLink
                  to="/transcripts/final-point"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded py-3 px-2"
                      : "flex items-center py-3 px-2"
                  }
                >
                  <AssignmentIcon
                    className="flex gap-2 mr-2"
                    sx={{ fontSize: "19px" }}
                  />
                  <div className="flex flex-col justify-center text-base not-italic leading-5 tracking-[0.016px]">
                    Bảng điểm tổng kết
                  </div>
                </NavLink>
              </li>
            </CollapsibleItem>
            <CollapsibleItem title="Cấu hình" icon={SettingsIcon}>
              <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer gap-2 self-stretch">
                <NavLink
                  to="/settings/students"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded py-3 px-2"
                      : "flex items-center py-3 px-2"
                  }
                >
                  <PersonSearchIcon
                    className="mr-2"
                    sx={{ fontSize: "19px" }}
                  />
                  <div className="flex flex-col justify-center text-base not-italic leading-5 tracking-[0.016px]">
                    Quản lí sinh viên
                  </div>
                </NavLink>
              </li>
              <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer gap-2 self-stretch">
                <NavLink
                  to="/settings/clubs"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded py-3 px-2"
                      : "flex items-center py-3 px-2"
                  }
                >
                  <GroupsIcon className="mr-2" sx={{ fontSize: "19px" }} />
                  <div className="flex flex-col justify-center text-base not-italic leading-5 tracking-[0.016px]">
                    Quản lí câu lạc bộ
                  </div>
                </NavLink>
              </li>
              <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer gap-2 self-stretch">
                <NavLink
                  to="/settings/departments"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded py-3 px-2"
                      : "flex items-center py-3 px-2"
                  }
                >
                  <RoomPreferencesIcon
                    className="mr-2"
                    sx={{ fontSize: "19px" }}
                  />
                  <div className="flex flex-col justify-center text-base not-italic leading-5 tracking-[0.016px]">
                    Quản lí phòng ban
                  </div>
                </NavLink>
              </li>
              <li className="border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer gap-2 self-stretch">
                <NavLink
                  to="/settings/semesters"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center bg-primary-100 text-primary-500 cursor-pointer hover:bg-primary-100 hover:border-black hover:text-black rounded py-3 px-2"
                      : "flex items-center py-3 px-2"
                  }
                >
                  <CalendarMonthIcon
                    className="mr-2"
                    sx={{ fontSize: "19px" }}
                  />
                  <div className="flex flex-col justify-center text-base not-italic leading-5 tracking-[0.016px]">
                    Quản lí kì học
                  </div>
                </NavLink>
              </li>
            </CollapsibleItem>
          </ul>
        </div>
        <div class="flex flex-col gap-2 self-stretch">
          <hr className="border-slate-950 w-full h-[1px]" />
          <div className="flex py-3 px-2 self-stretch border border-transparent rounded cursor-pointer hover:bg-primary-100 hover:border-black hover:shadow-xl">
            <LogoutIcon className="mr-2" sx={{ fontSize: "19px" }} />
            <NavLink to="/login" className="rounded cursor-pointer">
              <div className="flex flex-col justify-center text-base not-italic leading-5 tracking-[0.016px]">
                Đăng xuất
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
