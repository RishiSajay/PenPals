import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

const Goals : React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  //console.log(user);

  //const user = "1@gmail.com" // hardcoding
  const [XPG, setXPG] = useState("");
  const [XPD, setXPD] = useState("");
  const [WSG, setWSG] = useState("");
  const [WSD, setWSD] = useState("");
  const [WTG, setWTG] = useState("");
  const [WTD, setWTD] = useState("");
  const [HG, setHG] = useState("");
  const [HD, setHD] = useState("");
  const [WS, setWS] = useState("");
  const [WT, setWT] = useState("");
  const [XP, setXP] = useState("");
  const [H, setH] = useState("");

  function getCurrGoals() {
    const task = "read_goals";
    //event.preventDefault();
    axios
      .post(
        "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
        {
          user,
          task,
        }
      )
      .then((res) => setter(res.data.result))
      .catch((err) => console.log(err));
  }

  function setter(res: any) {
    console.log(res);
    try {
      setWS(res.WS);
      setWT(res.WT);
      setXP(res.XP);
      setH(res.H);
    } catch {
      // default values that weren't initially set
      console.log("defaulting progress");
      setWS("0");
      setWT("0");
      setXP("0");
      setH("0");
    }
    setWSG(res.WSG);
    setWSD(res.WSD);
    setWTD(res.WTD);
    setWTG(res.WTG);
    setXPD(res.XPD);
    setXPG(res.XPG);
    setHG(res.HG);
    setHD(res.HD);
  }

  // need these set from the frontend when user chooses goal to update
  const [goal, setGoal] = useState("");
  const [val, setVal] = useState("");
  const [date, setDate] = useState("");

  function goalUpdate(event: { preventDefault: () => void }) {
    // update existing goal
    event.preventDefault();
    console.log("starting update");
    const task = "write_goals";
    axios
      .post(
        "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
        {
          XP,
          XPG,
          XPD,
          WS,
          WSG,
          WSD,
          WT,
          WTG,
          WTD,
          H,
          HG,
          HD,
          user,
          task,
        }
      )
      .then((res) => checkRes(res.data))
      .catch((err) => console.log(err));
  }

  function checkRes(res: string) {
    console.log("success");
    window.location.href = "/home?user=" + user;
  }

  useEffect(() => {
    getCurrGoals();
  }, []);

  return (
    <>
      <form onSubmit={goalUpdate}>
        <div className="d-flex justify-content-center">
          <div className="card card w-25 mt-5 border border-primary rounded">
            {" "}
            <div className="card-body">
              {/* <div className="form-group">
                <label htmlFor="XP">XP Goal</label>
                <ProgressBar variant="info" now={Number(XP)} max={Number(XPG)}></ProgressBar>
                <input
                  type="int"
                  className="form-control"
                  id="XP"
                  placeholder="enter your XP goal"
                  value={XPG}
                  onChange={(e) => setXPG(e.target.value)}
                ></input>
                <input
                  type="date"
                  className="form-control"
                  id="XP date"
                  placeholder="enter a date to achieve your XP goal by"
                  value={XPD}
                  onChange={(e) => setXPD(e.target.value)}
                ></input>
              </div> */}
              <div className="form-group mt-2">
                <label htmlFor="WS">Words Spoken Goal</label>
                <ProgressBar
                  variant="info"
                  now={Number(WS)}
                  max={Number(WSG)}
                ></ProgressBar>
                <input
                  type="int"
                  className="form-control"
                  id="WS"
                  placeholder="enter your words spoken goal"
                  value={WSG}
                  onChange={(e) => setWSG(e.target.value)}
                ></input>
                <input
                  type="date"
                  className="form-control"
                  id="WS date"
                  placeholder="enter a date to achieve your words spoken goal by"
                  value={WSD}
                  onChange={(e) => setWSD(e.target.value)}
                ></input>
              </div>
              <div className="form-group mt-3">
                <label htmlFor="WT">Words Typed Goal</label>
                <ProgressBar
                  variant="info"
                  now={Number(WT)}
                  max={Number(WTG)}
                ></ProgressBar>
                <input
                  type="int"
                  className="form-control"
                  id="WT"
                  placeholder="enter your words typed goal"
                  value={WTG}
                  onChange={(e) => setWTG(e.target.value)}
                ></input>
                <input
                  type="date"
                  className="form-control"
                  id="WT date"
                  placeholder="enter a date to achieve your words typed goal by"
                  value={WTD}
                  onChange={(e) => setWTD(e.target.value)}
                ></input>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="H">Highlighting Goal</label>
                <ProgressBar
                  variant="info"
                  now={Number(H)}
                  max={Number(HG)}
                ></ProgressBar>
                <input
                  type="int"
                  className="form-control"
                  id="H"
                  placeholder="enter your highlighting goal"
                  value={HG}
                  onChange={(e) => setHG(e.target.value)}
                ></input>
                <input
                  type="date"
                  className="form-control"
                  id="H date"
                  placeholder="enter a date to achieve your highlighting goal by"
                  value={HD}
                  onChange={(e) => setHD(e.target.value)}
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

export default Goals;
