interface chatProps {
    botChat: string[];
    userChat: string[];
}

function Chat(chats : chatProps) {

    const handleClick = (word : string) => {
        console.log(`${word} clicked`);
    }
    return(
        <div>
        {chats.botChat.map((sentence, sentenceIndex) => (
          <div key={sentenceIndex}>
            {sentence.split(" ").map((word, wordIndex) => (
              <span key={wordIndex}>
                {wordIndex > 0 && " "}
                <span onClick={() => handleClick(word)} style={{ cursor: 'pointer' }}>
                  {word}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    );
}

export default Chat;