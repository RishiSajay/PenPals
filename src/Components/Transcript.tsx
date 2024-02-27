import React, { useState } from "react";
import "../Styles/Transcript.css";


function Transcript() {
  // State to manage the visibility of the text div
  const [isVisible, setIsVisible] = useState(true);

  // Function to toggle the visibility state
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container rounded-5 chatBox position-absolute bottom-0 start-50 translate-middle">
      <div className="row p-2">
        <div className="col"></div>
        <div className="col col-md-auto">
          <button className="btn btn-primary chatButton w-100 position-relative top-0 end-0 px-2">
            Finish Interaction
          </button>
        </div>
        <div className="col col-lg-2">
          <button className="btn btn-primary chatButton w-100 position-relative top-0 end-0 px-2" onClick={toggleVisibility}>
            {isVisible ? "Hide Chat" : "Show Chat"}
          </button>
        </div>
      </div>
      <div className="row">
          {/* Render the text div conditionally based on the state */}
          {isVisible && <div>Baguette</div>}
      </div>
    </div>
  );
}

export default Transcript;
