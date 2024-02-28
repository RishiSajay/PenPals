import React, { useState } from "react";
import "../Styles/Transcript.css";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Transcript() {
  // State to manage the visibility of the text div
  const [isVisible, setIsVisible] = useState(true);

  // Function to toggle the visibility state
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container chatBox rounded-2 position-absolute bottom-0 start-50 translate-middle">
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
          Baguette
        </div>
      </Collapse>
    </div>
  );
}

export default Transcript;
