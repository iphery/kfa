// app/components/Navbar.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoMdExit, IoMdPerson } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-50 text-black">
      <nav className="bg-white p-2">
        <div className="flex justify-between ">
          <h1>BWF - Mapping Data</h1>
          {localStorage.getItem("username") != null ? (
            <div className="flex items-center justify-start">
              <div className="text-primary">
                <IoPersonCircle className="h-6 w-6" />
              </div>
              <div className="ml-1 text-sm text-primary">{`${localStorage.getItem("username")}`}</div>
              <div
                className="ml-3  text-danger"
                onClick={async () => {
                  const response = await fetch(
                    "https://lime.farmaguru.id/logout",
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      credentials: "include",
                    },
                  );

                  console.log(response.status);

                  if (response.status == 200) {
                    window.location.reload();
                  } else {
                    alert("Logout failed");
                  }
                }}
              >
                <IoMdExit className="h-6 w-6" />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
