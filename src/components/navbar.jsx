// app/components/Navbar.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 text-black">
      <nav className="bg-white p-2">
        <div className="flex justify-between ">
          <h1>BWF - Mapping Data</h1>
          <div className="flex items-center justify-start">
            <div className="text-primary">
              <IoPersonCircle />
            </div>
            <div className="ml-1 text-sm text-primary">{`${localStorage.getItem("username")}`}</div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
