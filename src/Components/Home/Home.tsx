import React from "react";
import "../../Styles/Home.css";
import PracticeCard from "./PracticeCard";

const Home = () => {
  return (
    <>
      <div className="container">
        <p className="fs-1 fw-bold text-primary text-center">Home</p>
        <div className="d-flex justify-content-center">
          <PracticeCard
            topic="Cuisine"
            nextPath="/app"
            progress={45}
            lastVisited="2 days ago"
          >
            Learn how to ask about food recomendations, restaurant reviews, and
            more!
          </PracticeCard>
        </div>
      </div>
    </>
  );
};

export default Home;
