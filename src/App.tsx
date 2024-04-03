import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import microphoneImg from './assets/microphone.png';
import openChat from './assets/chat.svg';
import EmmaStatic from './assets/Emma Static.png';
import axios from 'axios';
import Definition from "./Components/Definition";
import { ProgressBar } from "react-bootstrap";


let words = 0;

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get('user');
  const goalPath = "/goals?user=" + user;

  const [isListening, setIsListening] = useState(false);
  const [showCard, setShowCard] = useState("");
  const [definition, setDefinition] = useState("");
  const [wordsT, setWordsT] = useState(0);
  const [wordsS, setWordsS] = useState(0);
  const [wordsH, setWordsH] = useState(0);
  const [WSG, setWSG] = useState(0);
  const [WTG, setWTG] = useState(0);
  const [HG, setHG] = useState(0);

  const {VITE_REACT_APP_KEY} = import.meta.env;

  function getCurrentGoals() {
    const task = "read_goals";
    axios
      .post(
        "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
        {
          user,
          task
        }
      )
      .then((res) => {
        setWordsS(res.data.result["WS"]),
        setWordsT(res.data.result["WT"]),
        setWordsH(res.data.result["H"]),
        setWSG(res.data.result["WSG"]),
        setWTG(res.data.result["WTG"]),
        setHG(res.data.result["HG"])
      })
      .catch((err) => console.log(err));
  }
  getCurrentGoals();

  function updateWS(res: any, words: number) {
    const updatedWords = Number(res.WS) + words;
    const WS = updatedWords.toString();

    const task = "write_goals";
      axios
        .post(
          "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
          {
            WS,
            user,
            task,
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    setWordsS(updatedWords);
  }

  function updateH(res: any, words: number) {
    const updatedWords = Number(res.WS) + words;
    const H = updatedWords.toString();
    const task = "write_goals";
      axios
        .post(
          "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
          {
            H,
            user,
            task,
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    setWordsH(updatedWords);
  }


  function updateWT(res: any, words: number) {
    const updatedWords = Number(res.WT) + words;
    const WT = updatedWords.toString();

    const task = "write_goals";
      axios
        .post(
          "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
          {
            WT,
            user,
            task,
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    setWordsT(updatedWords);
    console.log(wordsT);
  }

  const getDefinition = async (word: string) => {
      const options = {
          method: 'GET',
          url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
          params: {
              langpair: 'fr|en',
              q: `${word}`,
              mt: '1',
              onlyprivate: '0'
          },
          headers: {
              'X-RapidAPI-Key': `${VITE_REACT_APP_KEY}`,
              'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
          }
          };
      try {
        const task = "read_goals";
        axios
        .post(
          "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
          {
            user,
            task,
          }
        )
        .then((res) => updateH(res.data.result, word.split(" ").length))
        .catch((err) => console.log(err));
        const response = await axios.request(options);
        setDefinition(response.data.matches[0].translation);
      } catch (error) {
          console.error(error);
      }
  }

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
        // update goal
        let wordsSelected = selection.split(" ").length;
        console.log("words selected: ", wordsSelected);
        setShowCard(selection);
        getDefinition(selection);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup function to remove the event listener
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []); // Ensure useEffect runs only once at mount

  useEffect(() => {
    // Dynamically load the Dialogflow Messenger
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
    

    script.onload = () => {
      const messenger = document.createElement('df-messenger');
      messenger.setAttribute('intent', 'WELCOME');
      messenger.setAttribute('chat-title', 'Emma_Lefebvre');
      messenger.setAttribute('agent-id', '13286b34-c09b-4081-87f5-275c91baa4df');
      messenger.setAttribute('language-code', 'fr');
      messenger.setAttribute('chat-icon', `data:image/svg+xml;base64,${btoa(openChat)}`);
      document.body.appendChild(messenger);

      messenger.addEventListener('df-user-input-entered', function(event){
        // check number of words actually entered
        let wordsTyped = event.detail['input'].split(" ").length - words;
        console.log('words typed:', wordsTyped);

        // read current number of words typed to update
        const task = "read_goals"
        axios
          .post(
            "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
            {
              user,
              task,
            }
          )
          .then((res) => updateWT(res.data.result, wordsTyped))
          .catch((err) => console.log(err));
      });
    };

    

    return () => {
      // Cleanup: Remove the script and messenger elements
      document.body.removeChild(script);
      const messenger = document.querySelector('df-messenger');
      if (messenger) {
        document.body.removeChild(messenger);
      }
    };
  }, []);

  const runSpeechRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("This browser does not support Web Speech API");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'fr';
    recognition.start();
    setIsListening(true);

    recognition.onstart = () => {
      console.log("Voice recognition started. Try speaking into the microphone.");
    };

    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log(`Transcript: ${transcript}`);
      
      try {
        // Attempt to access the deeply nested input within the shadow DOMs
        const dfMessenger = document.querySelector('df-messenger');
        if (!dfMessenger || !dfMessenger.shadowRoot) {
          throw new Error('df-messenger or its shadowRoot is not accessible');
        }
    
        const dfMessengerChat = dfMessenger.shadowRoot.querySelector('df-messenger-chat');
        if (!dfMessengerChat || !dfMessengerChat.shadowRoot) {
          throw new Error('df-messenger-chat or its shadowRoot is not accessible');
        }
    
        const userInput = dfMessengerChat.shadowRoot.querySelector('df-messenger-user-input');
        if (!userInput || !userInput.shadowRoot) {
          throw new Error('df-messenger-user-input or its shadowRoot is not accessible');
        }
    
        const input = userInput.shadowRoot.querySelector('input[type="text"]') as HTMLInputElement;
        if (!input) {
          throw new Error('Input field is not found');
        }
        
        let wordsSpoken = transcript.split(" ").length;
        console.log("words spoken: ", wordsSpoken);

        // read current number of words spoken to update
        const task = "read_goals"
        axios
          .post(
            "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
            {
              user,
              task,
            }
          )
          .then((res) => updateWS(res.data.result, wordsSpoken))
          .catch((err) => console.log(err));


        input.value = transcript; 
        input.dispatchEvent(new Event('input', {bubbles: true}));
        input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter', bubbles: true})); 
        console.log(input.value);

      } catch (error) {
        console.error("Error sending transcript to Dialogflow Messenger:", error);
      }
    };
    
    

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
  }, []);

  return (
    

    <div className="App" style={{ 
      backgroundImage: `url(${EmmaStatic})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      position: 'relative', // Ensure the .App container is positioned relatively
    }}>
      <div className="goals-container"> 
        <div className="card w-25 mt-5 border border-dark rounded">
          <div className="card-body">
            <h3 className="text-center">Goals</h3>
            <ProgressBar variant="info" now={wordsS} max={WSG}/>
            Words Spoken
            <ProgressBar variant="info" now={wordsT} max={WTG} />
            Words Typed
            <ProgressBar variant="info" now={wordsH} max={HG} />
            Words Highlighted
          </div>
          <div className="container">
            <div className="d-flex justify-content-center">
              <a href={goalPath} className="btn btn-primary">
                Adjust Goals
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mic-container icon-10">
        <button className="mic-button bi bi-mic rounded-circle" onClick={runSpeechRecognition}>
          <img src={microphoneImg} alt="Microphone" />
        </button>
        {isListening ? <p className="text-light">I am listening! Please speak.</p> : <p className="text-light">Click the button to start talking!</p>}
      </div>
      <div className="position-fixed top-0 end-0">
        {showCard != "" && <Definition word={showCard} trans={definition}></Definition>}
      </div>
    </div>
    
  );
}

export default App;
