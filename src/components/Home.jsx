import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/authContext";

import avisaveVideo from "./images/avisaveVideo.mp4";

import homeOverlay from './images/homeOverlay.mp4'

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div >

      

      <nav>
        {!authCtx.token ? (

          <ul className="z-50 w-full absolute inline-flex float-right justify-end pt-8 pr-28 font-bold text-2xl font-inter top-0 text-eggshell ">
            
            <li class="pr-16 align-center hover:text-navy">
              <NavLink to="/">Home</NavLink>
            </li>
            <li class="pr-16 hover:text-navy">
              <NavLink to="/existinguser">Login</NavLink>
            </li>
            <li class='hover:text-navy'>
              <NavLink to="/newuser">Sign Up</NavLink>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/beauty ">Health and Beauty</NavLink>
            </li>
            <li>
              <NavLink to="/clothing ">Clothing, Shoes & Accessories</NavLink>
              <li>
                <NavLink to="/household ">Household Goods</NavLink>
              </li>
              <li>
                <NavLink to="/electronics ">Electronics</NavLink>
              </li>
              <li>
                <NavLink to="/deleted">Deleted Items</NavLink>
              </li>
            </li>
            <button
              className="logout-btn"
              onClick={() => {
                authCtx.logout();
              }}
            >
              Logout
            </button>
          </ul>
        )}
        </nav>

       <span className='z-50 float-right mt-72 mr-40 shadow-[0_15px_70px_navy] relative mx-auto rounded-lg overflow-hidden'>
        <video src={homeOverlay} autoPlay muted loop class="homeOverlay"/>
              </span>


      <video
        src={avisaveVideo}
        autoPlay
        muted
        loop
        class="shoppingVideo"
        className="fixed inset-0 w-full h-full object-cover bg-no-repeat -z-50"
      />
      <div className="absolute inset-0 w-full h-full z-10"></div>
              

             

              </div>
    
  );
};

export default Home;
