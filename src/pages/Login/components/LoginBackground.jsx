import { useMediaQuery } from "@mui/material";

import backgroundLoginDesktopUrl from "/Background-Login-Desktop.mp4";
import backgroundLoginMobileUrl from "/Background-Login-Mobile.mp4";
import { STRING_EMPTY } from "../../../constant/core";

// eslint-disable-next-line react/prop-types
const LoginBackground = ({ containerClassName }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className={containerClassName || STRING_EMPTY}>
      <div className="w-full h-full bg-gradient-to-t from-black"></div>
      <video
        className="absolute top-0 scale-150 sm:scale-125 bg-ora sm:-top-3/4 md:top-0 lg:scale-110 lg:-top-1/4 -rotate-12 object-cover -z-20"
        src={isDesktop ? backgroundLoginDesktopUrl : backgroundLoginMobileUrl}
        autoPlay
        playsInline
        loop
        muted
      />
    </div>
  );
};

export default LoginBackground;
