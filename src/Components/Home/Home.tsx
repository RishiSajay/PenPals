import "../../Styles/Home.css";
import PracticeCard from "./PracticeCard";

const Home = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  const appPath = `/app?user=${user}`;
  console.log(appPath);
  const goalPath = "/goals?user=" + user;
  

  return (
    <>
      <div className="container">
        <p className="fs-1 fw-bold text-primary text-center">Home</p>
        <div className="d-flex justify-content-center">
          <PracticeCard
            topic="Cuisine"
            nextPath={`${appPath}&intent=cuisine`}
            progress={45}
            lastVisited="2 days ago"
          >
            Learn how to ask about food recomendations, restaurant reviews, and
            more!
          </PracticeCard>
        </div>
      </div>

      <div className="container">
        <div className="d-flex justify-content-center">
          <a href={goalPath} className="btn btn-primary">
            Adjust Goals
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;
