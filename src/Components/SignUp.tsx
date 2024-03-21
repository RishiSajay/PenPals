import React from "react";

const Login = () => {
  return (
    <>
      <body>
        <input type="text" id="email" placeholder="Email" />
        <br></br>
        <input type="password" id="password" placeholder="Password" />
        <br></br>
        <input type="password" id="passwordC" placeholder="Confirm Password" />
        <br></br>
        <a href={"/home"}>SignUp</a>
        <br></br>
        <a href={"/"}>Back</a>
      </body>
    </>
  );
};

export default Login;
