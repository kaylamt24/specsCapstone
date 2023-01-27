import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/authContext";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <nav>
      {!authCtx.token ? (
        <ul className="logged-out-navbar">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/existinguser">Login</NavLink>
          </li>
          <li>
            <NavLink to="/newuser">Sign Up</NavLink>
          </li>
        </ul>
      ) : (
        <ul className="logged-in-navbar">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/form">Add A New Item</NavLink>
          </li>
          <li>
            <NavLink to="/deleted">Deleted Items</NavLink>
          </li>
          <li>
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
      )}
    </nav>
  );
};

export default Header;

