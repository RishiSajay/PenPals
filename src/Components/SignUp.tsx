import React from "react";

const Login = () => {
  return (
    <>
      {/* <body>
        <input type="text" id="email" placeholder="Email" />
        <br></br>
        <input type="password" id="password" placeholder="Password" />
        <br></br>
        <input type="password" id="passwordC" placeholder="Confirm Password" />
        <br></br>
        <a href={"/home"}>SignUp</a>
        <br></br>
        <a href={"/"}>Back</a>
      </body> */}
      <div className="d-flex justify-content-center">
        <div className="card card w-25 mt-5 border border-primary rounded">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
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
              <div className="form-group mt-2">
                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Confirm Password"
                ></input>
              </div>
              <div className="d-flex mt-2">
                <a href="/home" className="btn btn-primary me-3">
                  Sign Up
                </a>
                <a href="/" className="btn btn-primary">
                  Back
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
