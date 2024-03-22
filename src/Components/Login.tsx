import React from "react";

const Login = () => {
  return (
    <>
      {/* <body>
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
      </body> */}
      <div className="d-flex justify-content-center">
        <div className="w-25 mt-5">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              ></input>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else
              </small>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              ></input>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              ></input>
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember me (it won't matter)
              </label>
            </div>
            <div className="d-flex mt-2">
              <a href="/home" className="btn btn-primary me-3">
                Login
              </a>
              <a href="/" className="btn btn-primary">
                Back
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
