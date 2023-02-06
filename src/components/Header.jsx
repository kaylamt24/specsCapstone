import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/authContext";

import headerBanner from './images/headerBanner.png'




import {AiOutlineLogout} from "react-icons/ai";
import { TbTrash } from "react-icons/tb";
import { FiCoffee, FiHeadphones } from "react-icons/fi";
import { SlDiamond } from "react-icons/sl";
import {BsSuitHeart, BsStar } from 'react-icons/bs'


const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    // <main className="flex w-full">

    <nav>
    
      <img src={headerBanner} className=" flex absolute inset-0 w-full lg:h-80 md:h-80 sm:h-80" />

      {!authCtx.token ? (
        <ul className="z-50 w-full absolute inline-flex float-right justify-end pt-8 pr-28 font-bold text-3xl top-0 text-eggshell hover:before:decoration-green-500">
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
        <div className="inline-flex mt-72 h-20 w-full pt-7 bg-navy">
            <ul >
              <li className="text-l py-3 inline-flex mr-10">
                <SlDiamond size={30} className="mr-5 ml-8 text-limegreen" />
                <NavLink to="/profile" className='font-sans text-lg text-eggshell'>Profile</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-10">
                <BsSuitHeart size={30} className="mr-5 ml-4 text-limegreen" />
                <NavLink to="/beauty" className='font-sans text-lg text-eggshell'>Health and Beauty</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-10">
                <BsStar size={30} className="mr-5 ml-4 text-limegreen"/>
                <NavLink to="/clothing" className='font-sans text-lg text-eggshell'>Clothing, Shoes & Accessories</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-10">
                <FiCoffee size={30} className="mr-5 ml-4 text-limegreen" />
                <NavLink to="/household" className='font-sans text-lg text-eggshell'>Household Goods</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-10">
                <FiHeadphones size={30} className="mr-5 ml-4 text-limegreen" />
                <NavLink to="/electronics" className='font-sans text-lg text-eggshell'>Electronics</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-10">
                <TbTrash size={30} className="mr-5 ml-4 text-limegreen" />
                <NavLink to="/deleted" className='font-sans text-lg text-eggshell'>Deleted Items</NavLink>
              </li>

              <li className="text-l py-3 inline-flex pl-60">
                <AiOutlineLogout size={30} className="mr-4 ml-24 text-limegreen" />
                <NavLink to="/"></NavLink>
                <button 
                  className='font-sans text-lg  text-eggshell'
                  onClick={() => {
                    authCtx.logout();
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
       
        </div>
      )}
    </nav>
    // </main>
  );
};

export default Header;
