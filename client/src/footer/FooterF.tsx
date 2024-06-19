
"use client";

import { Footer } from "flowbite-react";
import './Footer.css'
import { NavLink } from "react-router-dom";


export function FooterF() {
  return (
    <Footer bgDark>
      <div className="w-full">
        <div className="w-full bg-[#0B1D26bb] px-4 py-6 sm:flex sm:items-center sm:justify-around">
          <Footer.Copyright className="T-M" href="/" by="BgRus™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "logo active" : "logo unactive"}
                    >
                        BGRUS
                    </NavLink>
          </div>
        </div>
      </div>
    </Footer>
  );
}
