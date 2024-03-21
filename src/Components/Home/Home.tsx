import React from "react";
import "../../Styles/Home.css";

const Home = () => {
  return (
    <>
      <div className="container">
        <p className="fs-1 fw-bold text-primary text-center">Home</p>
        <div className="d-flex justify-content-center">
          <a className="btn btn-primary" href={"/app"}>
            Practice
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
