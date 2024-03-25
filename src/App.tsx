import React, { useEffect, useState, useCallback, useRef } from 'react';
import './App.css';
import microphoneImg from './assets/microphone.png';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const dfMessenger = useRef(null); // Reference to the df-messenger element


  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const messenger = document.createElement('df-messenger');
      messenger.setAttribute('intent', 'WELCOME');
      messenger.setAttribute('chat-title', 'Emma_Lefebvre');
      messenger.setAttribute('agent-id', '13286b34-c09b-4081-87f5-275c91baa4df');
      messenger.setAttribute('language-code', 'fr');
      document.body.appendChild(messenger);
    };

    return () => {
      document.head.removeChild(script);
      const messenger = document.querySelector('df-messenger');
      if (messenger) {
        document.body.removeChild(messenger);
      }
    };
  }, []);

  const runSpeechRecognition = useCallback(() => {
    // Check for browser support
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
      const confidence = event.results[0][0].confidence;
      setTranscript(transcript);
      console.log(`Transcript: ${transcript}, Confidence: ${confidence*100}%`);
      // Here you might want to send the transcript to Dialogflow or perform another action
      if (dfMessenger.current) {
        try {
          const inputField = dfMessenger.current.shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-messenger-user-input').shadowRoot.querySelector('input[type="text"]');
          inputField.value = transcript;
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          inputField.dispatchEvent(submitEvent);
        } catch (error) {
          console.error("Error sending transcript to Dialogflow Messenger:", error);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
  }, []);

  return (
    <div className="App">
      <div className="mic-container">
        <button className="mic-button" onClick={runSpeechRecognition}>
          <img src={microphoneImg} alt="Microphone" />
        </button>
        {isListening ? <p>I am listening! Please speak.</p> : <p>Click the button to start talking!</p>}
        {transcript && <p>Transcript: {transcript}</p>}
      </div>
    </div>
  );
}

export default App;
