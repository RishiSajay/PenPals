import React, { useState } from "react";

function Transcript() {
  // State to manage the visibility of the text div
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle the visibility state
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? "Hide Chat" : "Show Chat"}
      </button>
      {/* Render the text div conditionally based on the state */}
      {isVisible && <div>Baguette</div>}
    </div>
  );
}

export default Transcript;
