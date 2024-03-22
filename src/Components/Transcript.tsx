import React, { useState } from "react";
import "../Styles/Transcript.css";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Chat from './Chat';
import Speech from './Speech';
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import micImage from "../assets/microphone.png"


let language = 'fr-FR';

function Transcript() {
  // State to manage the visibility of the text div
  const [isVisible, setIsVisible] = useState(true)
  // Function to toggle the visibility state
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: language});

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const botArr = ["Bonjour le monde", "please work"];

  return (
    <>
      <div className="row position-fixed bottom-0 w-100">
        <div className="col"></div>
        <div className="col-6 chatBox rounded-2">
          <div className="row">
            <div
              className="col"
            >
            </div>
            <div
              className="col col-lg-2"
            >
              <div className="btn-collapse">
                <Button
                  onTouchStart={startListening}
                  onMouseDown={startListening}
                  onTouchEnd={SpeechRecognition.stopListening}
                  onMouseUp={SpeechRecognition.stopListening}
                ><img src={micImage} width={60}></img></Button>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
              </div>
            </div>
            <div
              className="col col-lg-2"
            >
              <div className="btn-collapse">
                <Button
                  className="w-100 position-relative top-0 end-0 px-2"
                  onClick={toggleVisibility}
                  aria-controls="collapse-chat-text"
                  aria-expanded={isVisible}
                >
                    {isVisible ? "Hide Chat" : "Show Chat"}
                </Button>
              </div>
            </div>
            <div
              className="col col-lg-2"
            >
              <div className="btn-collapse">
                <Button
                  className="w-100 position-relative top-0 end-0 px-2"
                >
                  Finish Interaction
                </Button>
              </div>
            </div>
            
          </div>
          <Collapse in={isVisible}>
            <div id="collapse-chat-text">
              <Chat botChat={[transcript]} userChat={[transcript]}></Chat>
            </div>
          </Collapse>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}

export default Transcript;
