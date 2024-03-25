import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import microphoneImg from './assets/microphone.png';

function App() {
  const [isListening, setIsListening] = useState(false);

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
    
        input.value = transcript; // Set recognized text to input
        input.dispatchEvent(new Event('input', {bubbles: true})); // Ensure Vue.js or similar frameworks detect the change
        input.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter', bubbles: true})); // Simulate the Enter key press
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
    <div className="App">
      <div className="mic-container">
        <button className="mic-button" onClick={runSpeechRecognition}>
          <img src={microphoneImg} alt="Microphone" />
        </button>
        {isListening ? <p>I am listening! Please speak.</p> : <p>Click the button to start talking!</p>}
      </div>
    </div>
  );
}

export default App;
