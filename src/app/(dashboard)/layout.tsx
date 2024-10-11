import NavBar from "@/components/molecules/NavBar/NavBar";
import SideMenu from "@/components/molecules/SideMenu/SideMenu";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex font-urbanist  ">
      <SideMenu />
      <section className="lg:grow w-full">
        <NavBar />
        <div className="px-3 xl:px-9 py-3 xl:py-6 ">{children}</div>
      </section>
    </div>
  );
};

export default layout;
