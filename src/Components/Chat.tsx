import Definition from "./Definition";
import React, { useState } from "react";
import "../Styles/Chat.css";

interface chatProps {
  botChat: string[];
  userChat: string[];
}

function Chat(chats: chatProps) {
  const [showCard, setShowCard] = useState("");

  const handleClick = (word: string) => {
    setShowCard(word);
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
        {showCard != "" && <Definition word={showCard}></Definition>}
      </div>
    </div>
  );
}

export default Chat;
