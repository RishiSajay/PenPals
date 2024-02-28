import React, { useState } from "react";
import "../Styles/Transcript.css";
import Accordion from 'react-bootstrap/Accordion';

function Transcript() {
  // State to manage the visibility of the text div
  const [isVisible, setIsVisible] = useState(true);

  // Function to toggle the visibility state
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container position-absolute bottom-0 start-50 translate-middle">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <div className="row p-2">
            <div className="col"></div>
            <div className="col col-lg-2">
               <Accordion.Header>
                  <button className="btn btn-primary chatButton w-100 position-relative top-0 end-0 px-2" onClick={toggleVisibility}>
                    {isVisible ? "Hide Chat" : "Show Chat"}
                  </button>
                </Accordion.Header>
            </div>
            <div className="col col-md-auto">
              <button className="btn btn-primary chatButton w-100 position-relative top-0 end-0 px-2">
                Finish Interaction
              </button>
            </div>
            
          </div>
          <Accordion.Body>
            <div>
              Baguette
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Transcript;
