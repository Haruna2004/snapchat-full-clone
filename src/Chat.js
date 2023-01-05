import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-timeago";
import "./Chat.css";
import { selectImage } from "./features/appSlice";
import { db } from "./firebase";
const Chat = ({ id, profilePic, username, timestamp, imageUrl, read }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      navigate("/chats/view");
    }
  };
  return (
    <div onClick={open} className="chat">
      <Avatar src={profilePic} className="chat_avatar" />
      <div className="chat_info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          {<ReactTimeAgo date={new Date(timestamp?.toDate()).toUTCString()} />}
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat_readIcon" />}
    </div>
  );
};

export default Chat;
