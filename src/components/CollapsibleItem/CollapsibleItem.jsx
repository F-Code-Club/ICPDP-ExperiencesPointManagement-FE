import React, { useState } from 'react';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
const CollapsibleItem = ({ title, icon, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex flex-col gap-2 self-stretch">
      <div
        className="flex items-center justify-between py-3 px-2 border border-transparent hover:bg-primary-100 hover:border-black hover:shadow-xl rounded cursor-pointer self-stretch"
        onClick={() => setOpen(!open)}
      >
        {icon && <icon.type className="mr-2" sx={{ fontSize: "19px" }} />} 
        <div className="flex flex-col justify-center text-base not-italic leading-5 tracking-[0.016px] w-[80.667px]">
          {title}
        </div>
        {open ? (
          <ArrowDropDownIcon
            className="ml-auto"
            sx={{ fontSize: "19px" }}
          />
        ) : (
          <ArrowRightIcon
            className="ml-auto"
            sx={{ fontSize: "19px" }}
          />
        )}
      </div>
      {open && (
        <ul className="flex flex-col pl-8 gap-1 self-stretch">
          {children}
        </ul>
      )}
    </li>
  );
};

export default CollapsibleItem;