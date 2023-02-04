import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <main className="flex mb-40 w-full">
      <nav>
        {!authCtx.token ? (
          <ul className="z-50 w-full absolute p-[20px 8%] inline-flex float-right justify-end mt-4 pr-28 font-bold text-2xl .mb-20">
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
      </nav>

      <form className="mt-40 border-red-900 w-96 justify-center"onSubmit={submitHandler}>
        <header className=" inline-flex font-extrabold font-sans mb-4 border-red-700 text-2xl justify-center h-11 w-full">Log into your account!</header>
        <div className=" flex font-bold font-serif mb-8 border-red-900 justify-center">
          <NavLink to="/newuser">Don't have an account? Click here!</NavLink>
        </div>

        <div className="inline-flex">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-4 mb-4 h-12 w-96 border-pink-900 text-2xl rounded-2xl text-center"
          />
        </div>
        <input
          // type='password'
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-4 h-12 mb-4 w-96 border-purple-900 text-2xl text-center rounded-2xl"
        />
        <div className="flex justify-center">
          <button
            className=" h-12 w-48 flex-box border-2 border-green-900 mb-4 text-2xl rounded-2xl"
            onClick={() => setLogin(!login)}
          >
            Log In
          </button>
        </div>
        \
      </form>
    </main>
  );
};

export default ExistingUser;
