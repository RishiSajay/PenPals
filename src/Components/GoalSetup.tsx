import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";

const GoalSetup = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");

  const [isVisible, setIsVisible] = useState(false)

  const [WS, setWS] = useState("");
  const [WT, setWT] = useState("");
  const [H, setH] = useState("");
  const [CuisineG, setCG] = useState("0");
  const [CuisineD, setCD] = useState("0");
  const [Restaurant, setRestaurant] = useState("0");
  const [Beverages, setBeverages] = useState("0");
  const [Social, setSocial] = useState("0");
  const [Food, setFood] = useState("0");
  const [Paying, setPaying] = useState("0");

  const [userVerified, setUserVerified] = useState(false);
  const checkUserAuth = (user: any) => {
    if (user == null || user == "null") {
      window.location.href = "/";
    }
  };

  if (!userVerified) {
    checkUserAuth(user);
    setUserVerified(true);
  }

  const task = "write_goals";

  function initialGoals(event: { preventDefault: () => void }) {
    //setup for the first time
    event.preventDefault();
    setWS("0");
    setWT("0");
    // setXP("0");
    setH("0");
    setBeverages("0");
    setPaying("0");
    setFood("0");
    setRestaurant("0");
    setSocial("0");
    axios
      // .post("http://localhost:3000/goalsetup", {
      //   XPG,
      //   XPD,
      //   WSG,
      //   WSD,
      //   WTG,
      //   WTD,
      //   HG,
      //   HD,
      //   user,
      // })
      .post(
        "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
        {
          WS,
          WT,
          H,
          CuisineG,
          CuisineD,
          Restaurant,
          Beverages,
          Food,
          Paying,
          Social,
          user,
          task,
        }
      )
      .then((res) => checkRes(res.data))
      .catch((err) => console.log(err));
  }

  function checkRes(res: any) {
    console.log(res);
    if (res.result === "Success") {
      //console.log("success");
      window.location.href = "/home?user=" + user;
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
              <div className="form-group mt-2">
                <label htmlFor="WS">Cuisine Goal</label>
                <input
                  type="int"
                  className="form-control"
                  id="WS"
                  placeholder="enter your percentage goal"
                  onChange={(e) => {if(Number(e.target.value) > 0 && Number(e.target.value) <= 100){setCG(e.target.value), setIsVisible(false)}else{setIsVisible(true)}}}
                  //onChange={(e) => {console.log(e.target.value)}}
                ></input>
                <small id="percent" className="form-text text-danger">
                {isVisible ? "Not a valid percentage value" : ""}
                </small>
                <small>enter a date to achieve your percentage goal by</small>
                <input
                  type="date"
                  className="form-control"
                  id="WS date"
                  placeholder="enter a date to achieve your percentage goal by"
                  onChange={(e) => setCD(e.target.value)}
                ></input>
              </div>
              <div className="d-flex mt-2">
              <button type="submit" className="btn btn-primary">Submit</button>
              <a className="btn btn-primary mx-3" href={"/home?user=" + user}>
                Cancel
              </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default GoalSetup;
