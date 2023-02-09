import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

import newVideo from "./images/newVideo.mp4";

import newUserVideo from './images/newUserVideo.mp4'

//This is set to automatically go to the profile. If there is time, change the navigate to a UX webpage welcoming them to the website.

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
    };

    axios
      .post("/register", body)
      .then((res) => {
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        console.log("new account created", res.data);
        navigate("/profile");
      })
      .catch((err) => {
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setEmail("");
        console.log(err, "this is at the create a new account error");
      });
  };

  return (
    <main className="mt-72  bg-slate-100 overflow-hidden">
      <Header />

      <div className="grid grid-cols-2  h-full w-full mr-24">
        <form onSubmit={submitHandler}>
          <header className="font-extrabold mb-5 ml-96 text-4xl justify-center h-11 w-full mt-32 font-quicksand text-navy">
            Create an account!
          </header>

          <div className="mt-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-96 mb-6 mt-4 ml-32 h-12 mr-6 text-xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className=" mb-8 mt-4 h-12 w-96 mr-4 text-xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
          </div>

          <div className="inline-flex">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ml-32 grid mb-4 h-12 w-96 mr-6 text-xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
            <input
                type="password"
              // type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="grid mb-8 h-12 w-96 text-xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
          </div>

          <div className="inline-flex">
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-32 mr-28 grid mb-4 h-12 w-96 text-xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
            <button
              className="h-12 w-48 text-2xl text-center relative mx-auto rounded-lg overflow-hidden placeholder-black bg-limegreen shadow-[0px_7px_25px_navy]"
              path="/profile"
              onClick={() => setRegister(!register)}
            >
              Sign Up!
            </button>
          </div>
          <div className=" font-bold mt-8 mb-4 text-lg justify-center h-11 ml-96 font-quicksand text-navy">
            <NavLink to="/existinguser">
              Already have an account?{" "}
              <span className="text-limegreen underline font-extrabold">Click here!</span>
            </NavLink>
          </div>
        </form>
        <span className="grid mt-14 ml-72 mb-20 shadow-[0_15px_70px_navy] bg-transparent relative mx-auto rounded-lg overflow-hidden">
          <video src={newUserVideo} autoPlay muted noloop class="newVideo" />
        </span>
      </div>
    </main>
  );
};

export default NewUser;
