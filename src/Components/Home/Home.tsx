import { useState } from "react";
import "../../Styles/Home.css";
import PracticeCard from "./PracticeCard";
import axios from 'axios';

const Home = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  const appPath = `/app?user=${user}`;
  console.log(appPath);
  const goalPath = "/goals?user=" + user;

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
  }
  

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

  return (
    <>
      <div className="container" onLoad={getCurrGoals}>
        <p className="fs-1 fw-bold text-primary text-center">Home</p>
        <div className="row d-flex justify-content-center mb-5">
          <PracticeCard
                topic="Cuisine"
                nextPath={`${appPath}&intent=cuisine`}
                progress={0}
                lastVisited="Keep up the great work!"
              >
                Learn how to ask about food recomendations, restaurant reviews, and
                more!
            </PracticeCard>
        </div>
        <div className="row d-flex justify-content-center mb-5">
          <PracticeCard
                topic="Travel"
                nextPath={`${appPath}&intent=cuisine`}
                progress={0}
                lastVisited="Keep up the great work!"
              >
                Learn how to ask about transportation, destinations, and more!
            </PracticeCard>
        </div>
        <div className="row d-flex justify-content-center mb-5">
        <PracticeCard
              topic="Groceries"
              nextPath={`${appPath}&intent=cuisine`}
              progress={0}
              lastVisited="Keep up the great work!"
            >
              Learn how to ask about ingredients, recipes, and more!
            </PracticeCard>
        </div>
        
      </div>

      <div className="container">
        <div className="d-flex justify-content-center mt-3">
          <a href={goalPath} className="btn btn-primary">
            Adjust Goals
          </a>
          <button
            className="btn btn-primary ms-5"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
