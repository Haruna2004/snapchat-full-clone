import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ChatView.css";
import { selectSelectedImage } from "./features/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const ChatView = () => {
  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();
  const exit = () => {
    navigate("/chats");
  };
  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);
  return (
    <div className="chatView">
      <div className="chatView_timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={["#004777", "#F7B801", "#A30000"]}
          colorsTime={[9, 6, 3]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
      <img src={selectedImage} alt="" onClick={() => exit()} />
    </div>
  );
};

export default ChatView;
