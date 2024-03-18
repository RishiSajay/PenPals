import React, { useState } from "react";
import "../Styles/Transcript.css";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Chat from './Chat';

function Transcript() {
  // State to manage the visibility of the text div
  const [isVisible, setIsVisible] = useState(true)
  // Function to toggle the visibility state
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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
              <Chat botChat={botArr} userChat={botArr}></Chat>
            </div>
          </Collapse>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}

export default Transcript;
