"use client";
import React from "react";
import Image from "next/image";
// import image from "@/public/images/auth_layout_image.webp";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center p-9 h-screen   lg:gap-x-11 bg-primary">
      <div className="w-full lg:w-5/12 flex justify-center">{children}</div>
      <section className="w-7/12 h-full lg:block hidden">
        <Image   width={1000}
        height={1000} src="/images/login-bg.jpg" alt="auth_layout_image" className="w-full h-full object-cover rounded-3xl" />
      </section>
    </div>
  );
};

export default Layout;
