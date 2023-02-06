import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

import newVideo from "./images/newVideo.mp4";

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
    <main className="mt-80">
      <Header />

      <div className="grid grid-cols-2 bg-eggshell h-full w-full mr-24">
        <form onSubmit={submitHandler}>
          <header className="font-extrabold mb-6 ml-96 text-4xl justify-center h-11 w-full mt-24 text-navy font-serif">
            Create an account!
          </header>

          <div className="mt-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-96 mb-6 mt-4 ml-32 h-12 mr-6 text-2xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className=" mb-8 mt-4 h-12 w-96 mr-4 text-2xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
          </div>

          <div className="inline-flex">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ml-32 grid mb-4 h-12 w-96 mr-6 text-2xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
            <input
              //   type="password"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="grid mb-8 h-12 w-96 text-2xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
          </div>

          <div className="inline-flex">
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-32 mr-28 grid mb-4 h-12 w-96 text-2xl text-center shadow-[0px_7px_25px_navy] relative mx-auto rounded-lg overflow-hidden placeholder-black bg-white"
            />
            <button
              className="h-12 w-48 text-2xl text-center relative mx-auto rounded-lg overflow-hidden placeholder-black bg-limegreen shadow-[0px_7px_25px_navy]"
              path="/profile"
              onClick={() => setRegister(!register)}
            >
              Sign Up!
            </button>
          </div>
          <div className=" font-extrabold font-sans mt-8 mb-4 text-lg justify-center h-11 ml-96 text-navy">
            <NavLink to="/existinguser">
              Already have an account?{" "}
              <span className="text-limegreen underline">Click here!</span>
            </NavLink>
          </div>
        </form>
        <span className="grid mt-8 ml-72 mb-24 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-transparent relative mx-auto rounded-lg overflow-hidden">
          <video src={newVideo} autoPlay muted noloop class="newVideo" />
        </span>
      </div>
    </main>
  );
};

export default NewUser;
