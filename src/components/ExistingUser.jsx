import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

import loginScreenOne from './images/loginScreenOne.png'

const ExistingUser = () => {





  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      username,
      password,
    };

    axios
      .post("/login", body)
      .then((res) => {
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        console.log("login successful", res.data);
        navigate("/profile");
      })
      .catch((err) => {
        setUsername("");
        setPassword("");
        console.log(err, "this is at the catch of the login");
      });
  };

  return (
    <main className="mt-80">
      <Header />

      <div className="grid grid-cols-2 bg-eggshell h-full w-full mr-24">
      <span className='grid mt-5 ml-16 mb-4 mr-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-transparent relative mx-auto rounded-lg overflow-hidden'><img src={loginScreenOne}/></span>
        <form onSubmit={submitHandler}>
          <header className="font-extrabold mb-6 ml-72 text-4xl justify-center h-11 w-full mt-24 text-navy font-serif">
            Log into your account!
          </header>

          <div className='"mt-4"'>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-80 mb-6 mt-4 ml-36 h-12 mr-6 text-2xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
            <input
              // type='password'
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" mb-8 mt-4 h-12 w-80 mr-4 text-2xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
          </div>

          <button
            className="h-12 w-48 ml-96 text-2xl text-center relative mx-auto rounded-lg overflow-hidden placeholder-black bg-limegreen shadow-[0px_7px_25px_navy]"
            onClick={() => setLogin(!login)}
          >
            Log In
          </button>

          <div className=" font-extrabold font-sans mt-8 mb-4 text-lg justify-center h-11 ml-80 text-navy">
            <NavLink to="/newuser">
              Don't have an account?{" "}
              <span className="text-limegreen underline">Click here!</span>
            </NavLink>
          </div>
        </form>
        {/* <span className='grid mt-5 ml-16 mb-4 mr-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-transparent relative mx-auto rounded-lg overflow-hidden'><img src={loginScreenOne}/></span> */}
      </div>
    </main>
  );
};

export default ExistingUser;
