import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/authContext";

// import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import ExistingUser from "./components/ExistingUser";
import NewUser from "./components/NewUser";
import Deleted from "./components/Deleted";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Beauty from "./components/Beauty";
import Electronics from "./components/Electronics";
import Clothing from "./components/Clothing";
import Household from "./components/Household";
import Miscellaneous from './components/Miscellaneous'

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">




      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/existinguser"
          element={!authCtx.token ? <ExistingUser /> : <Navigate to="/" />}
        />
        <Route
          path="/newuser"
          element={!authCtx.token ? <NewUser /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={
            authCtx.token ? <Profile /> : <Navigate to="/" />
          }
        />
        <Route
          path="/deleted"
          element={
            authCtx.token ? <Deleted /> : <Navigate to="/" />
          }
        />
        <Route
          path="/beauty"
          element={authCtx.token ? <Beauty /> : <Navigate to="/" />}
        />
        <Route
          path="/electronics"
          element={
            authCtx.token ? <Electronics /> : <Navigate to="/" />
          }
        />
        <Route
          path="/clothing"
          element={
            authCtx.token ? <Clothing /> : <Navigate to="/" />
          }
        />
        <Route
          path="/household"
          element={
            authCtx.token ? <Household /> : <Navigate to="/" />
          }
        />
                <Route
          path="/miscellaneous"
          element={
            authCtx.token ? <Miscellaneous /> : <Navigate to="/" />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
