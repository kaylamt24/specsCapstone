import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/authContext";

import headerBanner from "./headerBanner.png";

import {
  AiOutlineLogout,
  AiOutlineSkin,
  AiOutlineHeart,
} from "react-icons/ai";
import { TbTrash } from "react-icons/tb";
import { FiCoffee, FiHeadphones } from "react-icons/fi";
import { SlDiamond } from "react-icons/sl";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    // <main className="flex w-full">

    <nav>
      <img src={headerBanner} className=" flex absolute inset-0 w-full h-72" />

      {!authCtx.token ? (
        <ul className="z-50 w-full absolute inline-flex float-right justify-end pt-10 pr-28 font-bold text-xl group-hover:underline">
          <li class="pr-16 align-center">
            <NavLink to="/">Home</NavLink>
          </li>
          <li class="pr-16">
            <NavLink to="/existinguser">Login</NavLink>
          </li>
          <li>
            <NavLink to="/newuser">Sign Up</NavLink>
          </li>
        </ul>
      ) : (
        <div className="fixed float-left w-[280px] h-screen pt-4 bg-eggshell mt-72">
          <nav>
            <ul>
              <li className="text-l py-5 flex">
                <SlDiamond size={30} className="mr-2 ml-4 text-navy" />
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li className="text-l py-5 flex">
                <AiOutlineHeart size={30} className="mr-2 ml-4 text-navy" />
                <NavLink to="/beauty ">Health and Beauty</NavLink>
              </li>
              <li className="text-l py-5 flex">
                <AiOutlineSkin size={30} className="mr-2 ml-4 text-navy" />
                <NavLink to="/clothing ">Clothing, Shoes & Accessories</NavLink>
              </li>
              <li className="text-l py-5 flex">
                <FiCoffee size={30} className="mr-2 ml-4 text-navy" />
                <NavLink to="/household ">Household Goods</NavLink>
              </li>
              <li className="text-l py-5 flex">
                <FiHeadphones size={30} className="mr-2 ml-4 text-navy" />
                <NavLink to="/electronics ">Electronics</NavLink>
              </li>
              <li className="text-l py-5 flex">
                <TbTrash size={30} className="mr-2 ml-4 text-navy" />
                <NavLink to="/deleted">Deleted Items</NavLink>
              </li>

              <li className="text-l py-32 flex">
                <AiOutlineLogout size={30} className="mr-4 ml-4 text-navy" />
                <NavLink to="/"></NavLink>
                <button 
                  className="logout-btn"
                  onClick={() => {
                    authCtx.logout();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </nav>
    // </main>
  );
};

export default Header;
