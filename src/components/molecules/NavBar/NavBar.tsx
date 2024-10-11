"use client";
import React from "react";
import Image from "next/image";

import { useUtilAuth } from "@/context/UtilityContext";


const NavBar = () => {
  const { setOpen } = useUtilAuth();
  return (
    <div className="sticky  top-0 z-10 flex h-16 items-center justify-between bg-white px-3 shadow-lg xl:h-[88px] xl:px-9">
      <h2
        className="hidden text-[28px] font-bold text-primary xl:block"
        onClick={() => setOpen(true)}
      >
        Dashboard
      </h2>
      {/* <Image
        src="/images/logo.png"
        width={500}
        height={500}
        alt="auth_logo"
        className="mb-10 h-auto max-w-[189px] rounded-3xl object-cover"
      />{" "} */}
      <Image
        src="/images/icons/user_profile.svg"
        alt=""
        width={500}
        height={500}
        className="w-8 h-8 xl:h-11 xl:w-11 rounded-full object-cover"
      />
    </div>
  );
};

export default NavBar;
