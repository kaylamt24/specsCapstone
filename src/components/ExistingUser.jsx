import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "./Header";

import mountainOne from "./images/mountainOne.png";
import mountainTwo from "./images/mountainTwo.png";
import mountainThree from "./images/mountainThree.png";
import mountainFour from "./images/mountainFour.png";


// import loginScreenOne from './images/loginScreenOne.png'

const ExistingUser = () => {

  const images = [
    mountainOne,
    mountainTwo,
    mountainThree,
    mountainFour,

  ];


  const [randomImage, setRandomImage] = useState(images[0]);
  const [lastIndex, setLastIndex] = useState(-1)


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
  useEffect(() => {
    const randomImageSelector = () => {
      let newIndex = Math.floor(Math.random() * images.length)
    while (newIndex === lastIndex) {
      newIndex = Math.floor(Math.randon() * images.length)
    };
    setLastIndex(newIndex)
    return images[newIndex]
  }
    setRandomImage(randomImageSelector());
  }, []);

  return (
    <main className="mt-80">
      <Header />

      <div className="grid grid-cols-2 bg-white h-full w-full mr-24">

        
      <span className="grid mt-5 ml-16 mb-4 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-transparent relative mx-auto rounded-lg overflow-hidden">
          <img src={randomImage} />
        </span>
        <form onSubmit={submitHandler}>
          <header className="font-extrabold mb-6 ml-72 text-4xl justify-center h-11 w-full mt-24 text-navy font-quicksand">
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
            className="h-12 w-48 ml-96 text-2xl text-center relative mx-auto rounded-lg overflow-hidden placeholder-black shadow-[0px_7px_25px_navy] bg-limegreen"
            onClick={() => setLogin(!login)}
          >
            Log In
          </button>

          <div className=" font-extrabold font-quicksand mt-8 mb-4 text-lg justify-center h-11 ml-80 text-navy">
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
