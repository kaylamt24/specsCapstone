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
    <main>
      <h1>NEW USER</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
        //   type="password"
        type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
        <button className="form-btn" path='/profile' onClick={() => setRegister(!register)}>Sign Up!</button>
        <NavLink className='change-pages-navlink' to='/existinguser'>Already have an account? Click here!</NavLink>
      </form>
    </main>
  );
};

export default NewUser;
