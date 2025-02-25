"use client";
import React from "react";
import Menu from "./menu";
import Profile from "./profile";
import Search from "./search";

const Header = () => {
  return (
    <header className="border-b p-4 mb-4 shadow-md">
      <div className="w-full mx-auto grid items-center gap-4 grid-cols-[1fr_2fr]">
        <div>
          <Menu />
        </div>
        <div className="flex items-center">
          <div className="w-full mr-4">
            <Search />
          </div>
          <div>
            <Profile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
