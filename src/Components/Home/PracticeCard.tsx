import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

interface Props {
  topic: string;
  nextPath: string;
  children: string;
  progress: number;
  lastVisited: string;
}
const PracticeCard = ({
  topic,
  nextPath,
  children,
  progress,
  lastVisited,
}: Props) => {
  return (
    <>
      <div className="card w-75 text-start">
        <div className="card-header">
          <ProgressBar animated now={progress} label={progress + "%"} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{topic}</h5>
          <p className="card-text">{children}</p>
          <a href={nextPath} className="btn btn-primary">
            Practice!
          </a>
        </div>
        <div className="card-footer text-muted">
          {"Last visited " + lastVisited}
        </div>
      </div>
    </>
  );
};

export default PracticeCard;
