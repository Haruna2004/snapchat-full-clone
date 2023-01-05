import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";
import { auth, provider } from "./firebase";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        )
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1384/1384066.png"
          alt=""
        />
        <Button variant="outline" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
