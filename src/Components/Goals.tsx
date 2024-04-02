
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from "react"
import axios, { AxiosResponse } from "axios"
import Card from "react-bootstrap/Card";
import ProgressBar from 'react-bootstrap/ProgressBar';
import GoalCard from './GoalCard';
var WS, WSG : string, WSD, WT, WTD, WTG, XP, XPD, XPG, H, HG, HD  // each goal curr amount, date, and goal amount for displaying :), 
// dates seem to be showing time values too but thats not relevant


const Goals : React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get('user');
  const wsgT = urlParams.get('wsg');
  const wsdT = urlParams.get('wsd');
  const wtgT = urlParams.get('wtg');
  const wtdT = urlParams.get('wtd');
  const whgT = urlParams.get('hg');
  const whdT = urlParams.get('hd');

  //const user = "1@gmail.com" // hardcoding

  function getCurrGoals(event: { preventDefault: () => void; }) {
    event.preventDefault();
    axios.post('http://localhost:3000/goals', {user})
    .then(res => setter(res.data[0]))
    .catch(err => console.log(err));
  }
  const event = { preventDefault: () => {} };
  getCurrGoals(event);

  function setter(res: { WS: any; WSG: any; WSD: any; WT: any; WTD: any; WTG: any; XP: any; XPD: any; XPG: any; H: any; HG: any; HD: any }) {
    WS = res.WS
    WSG = res.WSG
    WSD = res.WSD
    WT = res.WT
    WTD = res.WTD
    WTG = res.WTG
    XP = res.XP
    XPD = res.XPD
    XPG = res.XPG
    H = res.H
    HG = res.HG
    HD = res.HD
  }

  // need these set from the frontend when user chooses goal to update
  const[goal, setGoal] = useState('');
  const[val, setVal] = useState('');
  const[date, setDate] = useState('');

  function goalUpdate(event: { preventDefault: () => void; }) { // update existing goal
    event.preventDefault();
    axios.post('http://localhost:3000/goalsetup', {user, goal, val, date})
    .then(res => checkRes(res.data))
    .catch(err => console.log(err));
  }
 
  function checkRes(res: string) {
      if(res === 'Success') {
        // close goal change pop up if that is what you are doing
      }
  }

  const goals = [
    {
      title: 'Words Spoken',
      current: 10,
      target: wsgT,
      dueDate: wsdT
    },
    {
      title: 'Words Typed',
      current: 5,
      target: wtgT,
      dueDate: wtdT
    },
    {
      title: 'Words Highlighted',
      current: 2,
      target: whgT,
      dueDate: whdT
    }
  ];

  return (
    <div className="app">
      <h1>Goals Dashboard</h1>
      <div className="goals-section">
        {goals.map((goal, index) => (
          <GoalCard
            key={index}
            title={goal.title}
            current={goal.current}
            target={goal.target}
            dueDate={goal.dueDate}
          />
        ))}
      </div>
    </div>
  );
}
export default Goals;
  