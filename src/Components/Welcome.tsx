import React from "react";

const Welcome = () => {
  return (
    <>
      <div>Welcome To PenPals!</div>
      <a href={"/login"}>Login</a>
      <br></br>
      <a href={"/signUp"}>Sign Up</a>
    </>
  );
};

export default Welcome;
