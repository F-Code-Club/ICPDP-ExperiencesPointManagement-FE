import { Box } from "@mui/material";

import logoUrl from "/Logo.png";
import LoginBackground from "./components/LoginBackground";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative flex h-[100svh] min-w-[100vw] bg-black text-white">
      <LoginBackground containerClassName="absolute overflow-hidden h-[60%] min-w-full z-0" />
      <main className="!font-roboto w-full flex flex-col gap-6 desktop:gap-4 items-center justify-end desktop:justify-center px-4">
        <div className="flex items-center gap-2 justify-center w-full px-10 z-50">
          <Box
            component="img"
            src={logoUrl}
            alt="logo ICPDP Voting System"
            fetchPriority="high"
            className="w-[119px] h-[120px] sm:w-[150px] sm:h-[150px] desktop:w-[201px] desktop:h-52"
          />
          <div className="text-3xl desktop:text-[52px] desktop:leading-[57px] font-semibold">
            Experiences
            <br />
            Point
            <br />
            Management
          </div>
          <div className="absolute translate-x-10 desktop:translate-x-0 desktop:translate-y-10 w-[200px] h-[175px] bg-orange-500 rounded-full blur-[140px] z-40 transform-gpu"></div>
        </div>
        <div className="flex justify-center w-full h-max px-10 z-50">
          <LoginForm className="w-full max-w-[450px] max-h-[250px]" />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
