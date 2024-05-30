import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import GroupsIcon from '@mui/icons-material/Groups';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import { Link } from 'react-router-dom';
import { useState } from "react";


//rafce
const Sidebar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  return (
    <>
      <div
        className={`w-64 bg-sidebar text-black fixed h-full flex flex-col justify-between text-white rounded-r-lg   ${
          open ? "border-gray-700" : ""
        } `}
      >
        <div>
          <div className="flex items-center p-10 cursor-pointer">
          </div>
          <div className="flex flex-col items-center ">
            <AccountCircleIcon
            sx={{ fontSize: '5rem' }}
             alt="User Avatar"
             src="/static/images/avatar/1.jpg"
             className="mb-2"
             style={{ color: "black" }}
            />
            <h2 className="text-base font-bold text-black">Admin's name</h2>
            <p className="text-primary text-xs font-medium">ADMINISTRATOR</p>
          </div>
          <ul className="flex flex-col p-2 text-sm space-y-2 mt-4 text-black">
            <li className="flex items-center p-2 hover:bg-primary-100 hover:border-black hover:border hover:shadow-xl rounded cursor-pointer">
              <HomeIcon className="mr-2" sx={{ fontSize: '20px' }} />
              <a href="#">Trang chủ</a> 
              
            </li>
            <li className="flex flex-col">
              <li
                className="flex items-center p-2 hover:bg-primary-100 hover:border-black hover:border hover:shadow-xl rounded cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <AssignmentIcon className="mr-2" sx={{ fontSize: '18px'}} />
                <a href="#">Bảng điểm</a>
                {open ? (
                  <ArrowDropDownIcon className="ml-auto"sx={{ fontSize: '18px' }} />
                ) : (
                  <ArrowRightIcon className="ml-auto" sx={{ fontSize: '18px' }}/>
                )}
              </li>
              {open && (
                <ul className="pl-8 space-y-2">
                  <li className="flex items-center p-2 hover:bg-primary-100 hover:text-primary-500 rounded cursor-pointer">
                    <AssignmentTurnedInIcon className="mr-2" sx={{ fontSize: '18px' }} />
                    <a href="#">Bảng điểm phong trào</a>
                  </li>
                  <li className="flex items-center p-2 hover:bg-primary-100 hover:text-primary-500 rounded cursor-pointer">
                    <DashboardIcon className="mr-2" sx={{ fontSize: '18px' }}/>
                    <a href="#">Bảng điểm tổng kết</a>
                  </li>
                </ul>
              )}
            </li>
            <li className="flex flex-col">
              <li
                className="flex items-center p-2 hover:bg-primary-100 hover:border-black hover:border hover:shadow-xl rounded cursor-pointer"
                onClick={() => setOpen1(!open1)}
              >
                <SettingsIcon className="mr-2" sx={{ fontSize: '18px' }}/>
                <a href="#">Cấu hình</a>
                {open1 ? (
                  <ArrowDropDownIcon className="ml-auto" sx={{ fontSize: '18px' }}/>
                ) : (
                  <ArrowRightIcon className="ml-auto" sx={{ fontSize: '18px' }}/>
                )}
              </li>
              {open1 && (
                <ul className="pl-8 space-y-2">
                  <li className="flex items-center p-2 hover:bg-primary-100 hover:text-primary-500 rounded cursor-pointer">
                    <PersonSearchIcon className="mr-2" sx={{ fontSize: '18px' }}/>
                    <a href="#">Quản lí sinh viên</a>
                  </li>
                  <li className="flex items-center p-2 hover:bg-primary-100 hover:text-primary-500 rounded cursor-pointer">
                    <GroupsIcon className="mr-2" sx={{ fontSize: '18px' }}/>
                    <a href="#">Quản lí câu lạc bộ</a>
                  </li>
                  <li className="flex items-center p-2 hover:bg-primary-100 hover:text-primary-500 rounded cursor-pointer">
                    <RoomPreferencesIcon className="mr-2" sx={{ fontSize: '18px' }}/>
                    <a href="#">Quản lí phòng ban</a>
                  </li>
                  <li className="flex items-center p-2 hover:bg-primary-100 hover:text-primary-500 rounded cursor-pointer">
                    <CalendarMonthIcon className="mr-2" sx={{ fontSize: '18px' }}/>
                    <a href="#" >Quản lí kì học</a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div>
          <hr className="border-slate-950 ml-4 mr-4" />
          <div className="flex items-center text-sm text-black p-4 cursor-pointer">
            <LogoutIcon className="mr-2"  sx={{ fontSize: '18px' }} />
            <a href="#">Đăng xuất</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
