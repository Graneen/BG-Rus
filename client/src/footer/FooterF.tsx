
"use client";

import { Footer } from "flowbite-react";
import './Footer.css'
import { NavLink } from "react-router-dom";


export function FooterF() {
  return (
    <Footer bgDark>
      <div className="w-full footer-body">
        <div className=" px-4 py-6 sm:flex sm:items-center sm:justify-around">
          <Footer.Copyright className="T-M" by="BgRus™" year={2024} />
          <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "logo active mr-[10vh]" : "logo unactive mr-[10vh]"}
                    >
                        BGRUS
                    </NavLink>
        </div>
      </div>
    </Footer>
  );
}
