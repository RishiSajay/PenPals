import React from "react";

const Login = () => {
  return (
    <>
      <body>
        <input type="text" id="email" placeholder="Enter your email" />
        <br></br>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
        />
        <br></br>
        <a href={"/home"}>Login</a>
        <br></br>
        <a href={"/"}>Back</a>
      </body>
    </>
  );
};

export default Login;
