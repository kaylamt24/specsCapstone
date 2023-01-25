import "./App.css";

import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/authContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import ExistingUser from "./components/ExistingUser";
import NewUser from "./components/NewUser";
import Deleted from "./components/Deleted";
import Form from "./components/Form";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
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
          element={authCtx.token ? <Profile /> : <Navigate to="/existinguser" />}
        />
        <Route
          path="/form"
          element={authCtx.token ? <Form /> : <Navigate to="/existinguser" />}
        />
        <Route
          path="/deleted"
          element={authCtx.token ? <Deleted /> : <Navigate to="/existinguser" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
