import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import GoalSetup from "./GoalSetup";
import Goals from "./Goals";

let currUser:string = ""

const SignUp = () => {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[password2, setPassword2] = useState('');


  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if(password != password2) {
      // tell them their passwords are different
    }
    else {
      axios.post('http://localhost:3000/signup', {email, password})
      .then(res => checkRes(res.data))
      .catch(err => console.log(err));
    }
  }

  function checkRes(res: string) {
    console.log(res)
    if(res === 'SignUpSuccess') {
      currUser = email
      window.location.href = `/goalsetup?user=${currUser}`
    }
    else if(res === "SignUpFail") {
      // tell them they already have an account
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center">
        <div className="card card w-25 mt-5 border border-primary rounded">
          <div className="card-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={e=>setEmail(e.target.value)}
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
                  id="password1"
                  placeholder="Password"
                  onChange={e=>setPassword(e.target.value)}
                ></input>
              </div>
              <div className="form-group mt-2">
                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  placeholder="Confirm Password"
                  onChange={e=>setPassword2(e.target.value)}
                ></input>
              </div>
              <div className="d-flex mt-2">
              <button>Sign Up</button>
              </div>
          </div>
        </div>
      </div>
      </form>
    </>
  );
};

export default SignUp;
