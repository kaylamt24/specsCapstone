import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import { NavLink } from "react-router-dom";
import {useNavigate} from  "react-router-dom"

//This is set to automatically go to the profile. If there is time, change the navigate to a UX webpage welcoming them to the website.

const NewUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();

    let body = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email
    }

    axios
      .post('/register', body)
      .then((res) => {
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        console.log("new account created", res.data);
        navigate('/profile')
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
    <main className="flex mb-40 w-full">
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
  </nav>

      <form className="mt-40 border-red-900 justify-center w-full" onSubmit={submitHandler}>
      <header className=" inline-flex font-extrabold font-sans mb-4 border-red-700 text-2xl justify-center h-11 w-full">Create an account!</header>
      <div className="flex font-bold font-serif mb-8 border-red-900 justify-center">
        <NavLink to='/existinguser'>Already have an account? Click here!</NavLink>
        </div>

        <div className="inline-flex">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border-4 mb-4 h-12 w-96 border-pink-900 text-2xl rounded-2xl text-center mr-4"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border-4 mb-4 h-12 w-96 mr-4 border-purple-900 text-2xl rounded-2xl text-center"
        />
        </div>
        <div className="inline-flex">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-4 mb-4 h-12 w-96 mr-4 border-green-900 text-2xl rounded-2xl text-center"
        />
        <input
        //   type="password"
        type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-4 mb-4 h-12 w-96 border-orange-900 text-2xl rounded-2xl text-center"
        />
        </div>
        <div className="flex justify-center">
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-4 mb-4 h-12 w-96 border-yellow-900 text-2xl rounded-2xl text-center"
        />
        </div>

        <div className='flex justify-center'>
        <button className=" h-12 w-48 flex-box border-2 border-green-900 mb-4 text-2xl rounded-2xl" path='/profile' onClick={() => setRegister(!register)}>Sign Up!</button>
        </div>
      </form>
    </main>
  );
};

export default NewUser;


