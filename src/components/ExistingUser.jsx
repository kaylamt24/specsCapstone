import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import { NavLink } from "react-router-dom";
import {useNavigate} from  "react-router-dom"

const ExistingUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();


    let body = {
      username,
      password,
    };

      axios
        .post('/login', body)
        .then((res) => {
          authCtx.login(res.data.token, res.data.exp, res.data.userId);
          console.log("login successful", res.data);
          navigate('/profile')
        })
        .catch((err) => {
          setUsername("");
          setPassword("");
          console.log(err, "this is at the catch of the login");
        });
    }
 

  return (
    <main>
      <h1>EXISTING USER</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          type="text" 
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />

        <input
          type='password'
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
              <button className="form-btn" onClick={() => setLogin(!login)}>Log In</button>
          <NavLink className='change-pages-navlink' to='/newuser'>Don't have an account? Click here!</NavLink>
      </form>
    </main>   
  );

};

export default ExistingUser;
