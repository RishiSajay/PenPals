import { useState } from "react";
import "../../Styles/Home.css";
import PracticeCard from "./PracticeCard";

const Home = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  const appPath = `/app?user=${user}`;
  console.log(appPath);
  const goalPath = "/goals?user=" + user;
  

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
      <div className="container">
        <p className="fs-1 fw-bold text-primary text-center">Home</p>
        <div className="d-flex justify-content-center">
          <PracticeCard
            topic="Cuisine"
            nextPath={`${appPath}&intent=cuisine`}
            progress={45}
            lastVisited="Keep up the great work!"
          >
            Learn how to ask about food recomendations, restaurant reviews, and
            more!
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
