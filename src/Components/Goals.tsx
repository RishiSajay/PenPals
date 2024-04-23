import { ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Goals : React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  //console.log(user);

  const [isVisible, setIsVisible] = useState(false)

  //const user = "1@gmail.com" // hardcoding
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
      setH(res.H);
      setCD(res.CuisineD);
      setCG(res.CuisineG);
      setRestaurant(res.Restaurant);
      setBeverages(res.Beverages);
      setFood(res.Food);
      setSocial(res.Social);
      setPaying(res.Paying);
    } catch {
      // default values that weren't initially set
      console.log("defaulting progress");
      setWS("0");
      setWT("0");
      setH("0");
      setRestaurant("0");
      setFood("0");
      setBeverages("0");
      setSocial("0");
      setPaying("0");
    }
    // setWSG(res.WSG);
    // setWSD(res.WSD);
    // setWTD(res.WTD);
    // setWTG(res.WTG);
    // setXPD(res.XPD);
    // setXPG(res.XPG);
    // setHG(res.HG);
    // setHD(res.HD);
    // setRestaurant("2");
    // setRestaurantG("10")
  }

  // need these set from the frontend when user chooses goal to update
  // const [goal, setGoal] = useState("");
  // const [val, setVal] = useState("");
  // const [date, setDate] = useState("");

  function goalUpdate(event: { preventDefault: () => void }) {
    // update existing goal
    event.preventDefault();
    console.log("starting update");
    const task = "write_goals";
    axios
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

  function checkRes(res: string) {
    console.log(res);
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
              <div className="form-group mt-2">
                <label htmlFor="CG">Cuisine Goal</label>
                <ProgressBar
                  variant="info"
                  now={Number(Restaurant)+Number(Beverages)+Number(Food)+Number(Paying)+Number(Paying)}
                  max={247} // total phrases
                ></ProgressBar>
                {Number(Restaurant)+Number(Beverages)+Number(Food)+Number(Paying)+Number(Paying)}%
                <input
                  type="int"
                  className="form-control"
                  id="CG"
                  placeholder={"current goal: " + CuisineG}
                  //value={CuisineG}
                  onChange={(e) => {if(Number(e.target.value) > 0 && Number(e.target.value) <= 100){setCG(e.target.value), setIsVisible(false)}else{setIsVisible(true)}}}
                  //onChange={(e) => setCG(e.target.value)}
                ></input>
                <small id="percent" className="form-text text-danger">
                {isVisible ? "Not a valid percentage value" : ""}
                </small>
                <input
                  type="date"
                  className="form-control"
                  id="CGD"
                  value={CuisineD}
                  onChange={(e) => setCD(e.target.value)}
                ></input>
              </div>
              
              <button type="submit" className="btn btn-primary">Submit</button>
              <a className="btn btn-primary mx-3" href={"/home?user=" + user}>
                Cancel
              </a>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Goals;
