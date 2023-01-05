//IconPacks
import CloseIcon from "@mui/icons-material/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
//IconPacks
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/CameraSlice";
import { v4 as uuid } from "uuid";
import { db, storage } from "./firebase";
import firebase from "firebase/compat/app";
import "./Preview.css";
import { selectUser } from "./features/appSlice";

const Preview = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, "data_url");

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        //ERROR FUNCTION
        console.log(error);
      },
      () => {
        //ON COMPLETE
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            navigate("/chats");
          });
      }
    );
  };

  const closePreview = () => {
    dispatch(resetCameraImage());
  };
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cameraImage) {
      navigate("/");
    }
  }, [cameraImage, navigate]);
  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preveiw_close" />
      <div className="preview_toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div className="preview_footer" onClick={sendPost}>
        <h2>Send Now</h2>
        <SendIcon fontSize="small" className="preview_send" />
      </div>
    </div>
  );
};

export default Preview;
