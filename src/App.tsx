import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import microphoneImg from './assets/microphone.png';
import EmmaStatic from './assets/Emma Static.png';
import axios from 'axios';
import Definition from "./Components/Definition";
import { ProgressBar } from "react-bootstrap";


function App() {
  const [isListening, setIsListening] = useState(false);
  const [showCard, setShowCard] = useState("");
  const [definition, setDefinition] = useState("");

  const {VITE_REACT_APP_KEY} = import.meta.env;

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
      document.body.appendChild(messenger);
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
    
        input.value = transcript; 
        input.dispatchEvent(new Event('input', {bubbles: true}));
        input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter', bubbles: true})); 
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
            <ProgressBar variant="info" now={20} />
            Cultural References
            <ProgressBar variant="info" now={70} />
            Places
            <ProgressBar variant="info" now={10} />
            Talking about Food
            <ProgressBar variant="info" now={40} />
            Artwork
          </div>
        </div>
      </div>
      <div className="mic-container">
        <button className="mic-button" onClick={runSpeechRecognition}>
          <img src={microphoneImg} alt="Microphone" />
        </button>
        {isListening ? <p>I am listening! Please speak.</p> : <p>Click the button to start talking!</p>}
      </div>
      <div className="position-fixed top-0 end-0">
        {showCard != "" && <Definition word={showCard} trans={definition}></Definition>}
      </div>
    </div>
    
  );
}

export default App;
