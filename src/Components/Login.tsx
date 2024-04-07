import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
var currUser = "";
export const environment = {
  currUser,
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const task = "login";

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    axios
      // .get(
      //   "https://h550rgrgn0.execute-api.us-east-1.amazonaws.com/prod/resource" +
      //     "?email=" +
      //     email +
      //     "&password=" +
      //     password +
      //     "&task=" +
      //     task
      // )
      .post(
        "https://h550rgrgn0.execute-api.us-east-1.amazonaws.com/prod/resource_2",
        { email, password, task }
      )
      .then((res) => checkRes(res.data))
      .catch((err) => console.log(err));
  }

  function checkRes(res: any) {
    console.log(res);
    if (res.result == "login_successful") {
      currUser = email;
      window.location.href = `/home?user=${currUser}`;
    } else if (res.result == "login_failed") {
      setLoginFailed(true);
      console.log(res.result);
      console.log(res.result_info);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <div className="card card w-25 mt-5 border border-primary rounded">
            {" "}
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
              </div>
              <div className="d-flex mt-2">
                <button className="btn btn-primary">Login</button>
              </div>
              {loginFailed && (
                <div
                  className="alert alert-danger alert-dismissible mt-2 "
                  role="alert"
                >
                  <div>The email or password is incorrect!</div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setLoginFailed(false)}
                  ></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
