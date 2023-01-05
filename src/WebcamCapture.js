import { useCallback, useRef, useState } from "react";
import "./WebcamCapture.css";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/CameraSlice";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMod: "user",
};

const WebCamCapture = () => {
  const dispatch = useDispatch();
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/preview");
  }, [webcamRef]);
  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        imageSmoothing={true}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture_button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
};

export default WebCamCapture;
