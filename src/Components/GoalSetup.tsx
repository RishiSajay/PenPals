import { ProgressBar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react";
import axios from "axios";

const GoalSetup = () => {
  const user = "1@gmail.com"
  const[XP, setXP] = useState('');
  const[XPD, setXPD] = useState('');
  const[WS, setWS] = useState('');
  const[WSD, setWSD] = useState('');
  const[WT, setWT] = useState('');
  const[WTD, setWTD] = useState('');
  const[H, setH] = useState('');
  const[HD, setHD] = useState('');

  function initialGoals(event: { preventDefault: () => void; }) { //setup for the first time
    event.preventDefault();
    axios.post('http://localhost:3000/goalsetup', {XP, XPD, WS, WSD, WT, WTD, H, HD, user})
    .then(res => checkRes(res.data))
    .catch(err => console.log(err));
  }

  function checkRes(res: string) {
    if(res === 'Success') {
      window.location.href = '/goals'
    }
  }

    return (
      <>                
        {/* can you make all fields required if they are not already */}
        <form onSubmit={initialGoals}>
        <div className="d-flex justify-content-center">
        <div className="card card w-25 mt-5 border border-primary rounded">
          {" "}
          <div className="card-body">
              <div className="form-group">
                <label htmlFor="XP">XP Goal</label>
                <input
                  type="int"
                  className="form-control"
                  id="XP"
                  placeholder="enter your XP goal"
                  onChange={e=>setXP(e.target.value)}
                ></input>
                <input
                  type="date"
                  className="form-control"
                  id="XP date"
                  placeholder="enter a date to achieve your XP goal by"
                  onChange={e=>setXPD(e.target.value)}
                ></input>
              </div>
              <div className="form-group mt-2">
              <label htmlFor="WS">Words Spoken Goal</label>
                <input
                  type="int"
                  className="form-control"
                  id="WS"
                  placeholder="enter your words spoken goal"
                  onChange={e=>setWS(e.target.value)}
                ></input>
                <input
                  type="date"
                  className="form-control"
                  id="WS date"
                  placeholder="enter a date to achieve your words spoken goal by"
                  onChange={e=>setWSD(e.target.value)}
                ></input>
              </div>
              <div className="form-group mt-3">
              <label htmlFor="WT">Words Typed Goal</label>
                <input
                  type="int"
                  className="form-control"
                  id="WT"
                  placeholder="enter your words typed goal"
                  onChange={e=>setWT(e.target.value)}
                ></input>
                <input
                  type="date"
                  className="form-control"
                  id="WT date"
                  placeholder="enter a date to achieve your words typed goal by"
                  onChange={e=>setWTD(e.target.value)}
                ></input>
              </div>
              <div className="form-group mt-4">
              <label htmlFor="H">Highlighting Goal</label>
                <input
                  type="int"
                  className="form-control"
                  id="H"
                  placeholder="enter your highlighting goal"
                  onChange={e=>setH(e.target.value)}
                ></input>
                <input
                  type="date"
                  className="form-control"
                  id="H date"
                  placeholder="enter a date to achieve your highlighting goal by"
                  onChange={e=>setHD(e.target.value)}
                ></input>
              </div>
              <div className="d-flex mt-2">
              <button>Submit</button>
              </div>
          </div>
        </div>
      </div>
      </form>

      </>
    );
  };
  
  export default GoalSetup;
  