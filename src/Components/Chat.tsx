import Definition from "./Definition";
import React, { useState } from "react";
import "../Styles/Chat.css";
import axios from 'axios';

interface chatProps {
  botChat: string[];
  userChat: string[];
}

function Chat(chats: chatProps) {
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
  const [showCard, setShowCard] = useState("");
  const [definition, setDefinition] = useState("");

  const handleClick = (word: string) => {
    setShowCard(word);
    getDefinition(word);
  };
  return (
    <div>
      {chats.botChat.map((sentence, sentenceIndex) => (
        <div key={sentenceIndex}>
          {sentence.split(" ").map((word, wordIndex) => (
            <span key={wordIndex}>
              {wordIndex > 0 && " "}
              <span
                onClick={() => handleClick(word)}
                className="word"
                title={word}
              >
                {word}
              </span>
            </span>
          ))}
        </div>
      ))}
      <div className="position-fixed top-0 end-0">
        {showCard != "" && <Definition word={showCard} trans={definition}></Definition>}
      </div>
    </div>
  );
}

export default Chat;
