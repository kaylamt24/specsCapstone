import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/authContext";

import headerBanner from './images/headerBanner.png'




import {AiOutlineLogout} from "react-icons/ai";
import { TbTrash, TbRocket } from "react-icons/tb";
import { FiCoffee, FiHeadphones } from "react-icons/fi";
import { SlDiamond } from "react-icons/sl";
import {BsSuitHeart, BsStar } from 'react-icons/bs'


const Header = () => {
  const authCtx = useContext(AuthContext);

  

  return (
    // <main className="flex w-full">

    <nav>
    
      <img src={headerBanner} className=" flex absolute inset-0 w-full lg:h-72 md:h-72 sm:h-64" />

      {!authCtx.token ? (
        <ul className="z-50 w-full absolute inline-flex float-right justify-end pt-8 pr-28 font-bold font-inter text-2xl top-0 text-eggshell hover:before:decoration-green-500">
          <li className="pr-16 align-center hover:text-limegreen">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="pr-16 hover:text-limegreen">
            <NavLink to="/existinguser">Login</NavLink>
          </li>
          <li className='hover:text-limegreen'>
            <NavLink to="/newuser">Sign Up</NavLink>
          </li>
        </ul>
      ) : (
        <div className="inline-flex mt-64 h-20 w-full pt-8 bg-navy">
            <ul >
              <li className="text-l py-3 inline-flex mr-6">
                <SlDiamond size={28} className="mr-4 ml-8 text-limegreen" />
                <NavLink to="/profile" className='font-quicksand text-lg text-eggshell hover:text-limegreen'>Profile</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-6">
                <BsSuitHeart size={28} className="mr-3 ml-4 text-limegreen " />
                <NavLink to="/beauty" className='font-quicksand text-lg text-eggshell hover:text-limegreen'>Health and Beauty</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-6">
                <BsStar size={28} className="mr-3 ml-4 text-limegreen"/>
                <NavLink to="/clothing" className='font-quicksand text-lg text-eggshell hover:text-limegreen'>Clothing, Shoes & Accessories</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-6">
                <FiCoffee size={28} className="mr-3 ml-4 text-limegreen" />
                <NavLink to="/household" className='font-quicksand text-lg text-eggshell hover:text-limegreen'>Household Goods</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-6">
                <FiHeadphones size={28} className="mr-3 ml-4 text-limegreen" />
                <NavLink to="/electronics" className='font-quicksand text-lg text-eggshell hover:text-limegreen'>Electronics</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-6">
                <TbRocket size={28} className="mr-3 ml-4 text-limegreen" />
                <NavLink to="/miscellaneous" className='font-quicksand text-lg text-eggshell hover:text-limegreen'>Miscellaneous</NavLink>
              </li>
              <li className="text-l py-3 inline-flex mr-6">
                <TbTrash size={28} className="mr-3 ml-4 text-limegreen hover:text-eggshell" />
                <NavLink to="/deleted" className=' text-lg text-eggshell hover:text-limegreen font-quicksand'>Deleted Items</NavLink>
              </li>

              <li className="text-lg py-3 inline-flex pl-52">
                <AiOutlineLogout size={28} className="mr-3 ml-16 text-limegreen" />
                <NavLink to="/"></NavLink>
                <button 
                  className='font-quicksand text-l  text-eggshell hover:text-limegreen'
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
