import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/authContext";

import avisaveVideo from "./images/avisaveVideo.mp4";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>

      <nav>
        {!authCtx.token ? (

          <ul className="z-50 w-full absolute p-[20px 8%] inline-flex float-right justify-end mt-4 pr-28 font-bold text-2xl group-hover:underline .mb-20">
            
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
      <video
        src={avisaveVideo}
        autoPlay
        muted
        loop
        class="shoppingVideo"
        className=" flexabsolute inset-0 w-full h-full object-cover bg-no-repeat"
        
      />

</nav>

          <div class="text-3xl font-bold underline text-center">Avisave </div>

    
    </div>
  );
};

export default Home;
