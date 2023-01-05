import "./Chats.css";
import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { resetImage, selectUser } from "./features/appSlice";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "./features/CameraSlice";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };
  return (
    <div className="chats">
      <div className="chats_header">
        <Avatar
          src={user.profilePic}
          className="chats_avatar"
          onClick={() => auth.signOut()}
          style={{ cursor: "pointer" }}
        />
        <div className="chats_search">
          <SearchIcon className="chats_searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats_chatIcon" />
      </div>
      <div className="chat_posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonCheckedIcon
        className="chats_takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
