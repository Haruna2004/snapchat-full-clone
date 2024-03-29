import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebcamCapture from "./WebcamCapture";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384066.png"
              alt=""
              className="app_logo"
            />
            <div className="app_body">
              <div className="app_background">
                <Routes>
                  <Route path="/chats/view" element={<ChatView />} />
                  <Route exact path="/" element={<WebcamCapture />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/chats" element={<Chats />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div> 
  );
}

export default App;
