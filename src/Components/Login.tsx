import React from "react";

// const textE = document.createElement("input");
// textE.type = "text";
// textE.placeholder = "Enter your email";
// textE.value = "";
// textE.id = "email";
// document.getElementsByTagName('body')[0].appendChild(textE);

// const textP = document.createElement("input");
// textP.type = "password";
// textP.placeholder = "Enter your password";
// textP.value = "";
// textP.id = "password";
// document.getElementsByTagName('body')[0].appendChild(textP);

const Login = () => {
  return (
    <>
      <body>
        <input type="text" id="email" placeholder="Enter your email"/>
        <br></br>
        <input type="password" id="password" placeholder="Enter your password"/>
        <br></br>
        <a href={"/home"}>Login</a>
      </body>
    </>
  );
};

export default Login;
