import React, { useState } from 'react';
import moment from 'moment';
import '../Styles/Goals.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface Goal {
  title: string;
  current: number;
  target: any;
  dueDate: any;
}

const GoalCard: React.FC<Goal> = ({ title, current, target, dueDate }) => {
  const [newDueDate, setNewDueDate] = useState(dueDate);
  const [newTarget, setNewTarget] = useState(target);

  // Calculate time remaining
  const timeRemaining = moment(newDueDate).diff(moment(), 'days');

  const handleEdit = () => {
    // Here, you can implement the logic to edit the due date and/or target
    console.log(`Editing ${title}`);
  };

  return (
    <div className="goal-card">
      <h2>{title}</h2>
      <div>
        <strong>Due Date:</strong> {moment(dueDate).format('MMM DD, YYYY')}
      </div>
      <div>
        <strong>Time Remaining:</strong> {timeRemaining} days
      </div>
      <div>
        <ProgressBar now={current/target * 100}></ProgressBar>
      </div>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default GoalCard;