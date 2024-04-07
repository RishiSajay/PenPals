import { useState } from "react";
import "../Styles/Transcript.css";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Chat from "./Chat";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import micImage from "../assets/microphone.png";
// import dialogflow from '@google-cloud/dialogflow';

// const sessionId = '12345'; // You can use a random or user-specific session id
// const projectId = 'emma-lefebvre-vupd'; // Your Google Cloud project id
// const sessionClient = new dialogflow.SessionsClient();
// const languageCode = 'fr';
// const queries = ["Hello"];

let language = "fr-FR";

// async function detectIntent(
//   projectId: string,
//   sessionId: string,
//   query: any,
//   contexts: string | any[] | null | undefined,
//   languageCode: string
// ) {
//   // The path to identify the agent that owns the created intent.
//   const sessionPath = sessionClient.projectAgentSessionPath(
//     projectId,
//     sessionId
//   );

//   // The text query request.
//   const request = {
//     session: sessionPath,
//     queryInput: {
//       text: {
//         text: query,
//         languageCode: languageCode,
//       },
//     },
//   };

//   // if (contexts && contexts.length > 0) {
//   //   request.queryParams = {
//   //     contexts: contexts,
//   //   };
//   // }

//   const responses = await sessionClient.detectIntent(request);
//   return responses[0];
// }

// async function executeQueries(projectId: string, sessionId: string, queries: any, languageCode: string) {
//   // Keeping the context across queries let's us simulate an ongoing conversation with the bot
//   let context;
//   let intentResponse;
//   for (const query of queries) {
//     try {
//       console.log(`Sending Query: ${query}`);
//       intentResponse = await detectIntent(
//         projectId,
//         sessionId,
//         query,
//         context,
//         languageCode
//       );
//       console.log('Detected intent');
//       const queryResult = intentResponse?.queryResult;
//       if (queryResult) {
//         console.log(
//           `Fulfillment Text: ${queryResult.fulfillmentText}`
//         );
//         // Use the context from this response for next queries
//         context = queryResult.outputContexts;
//       } else {
//         console.error('queryResult is undefined or null');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

function Transcript() {
  // State to manage the visibility of the text div
  const [isVisible, setIsVisible] = useState(true);
  // Function to toggle the visibility state
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: language });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const processTranscript = (text: string) => {
    console.log("Processing transcript:", text);
    // queries.push(text);
    // executeQueries(projectId, sessionId, queries, languageCode);
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    processTranscript(transcript);
  };

  // const botArr = ["Bonjour le monde", "please work"];

  return (
    <>
      <div className="row position-fixed bottom-0 w-100">
        <div className="col"></div>
        <div className="col-6 chatBox rounded-2">
          <div className="row">
            <div className="col"></div>
            <div className="col col-lg-2">
              <div className="btn-collapse">
                <Button
                  onTouchStart={startListening}
                  onMouseDown={startListening}
                  onTouchEnd={SpeechRecognition.stopListening}
                  onMouseUp={handleStopListening}
                >
                  <img src={micImage} width={60}></img>
                </Button>
                <p>Microphone: {listening ? "on" : "off"}</p>
              </div>
            </div>
            <div className="col col-lg-2">
              <div className="btn-collapse">
                <Button
                  className="w-100 position-relative top-0 end-0 px-2"
                  onClick={toggleVisibility}
                  aria-controls="collapse-chat-text"
                  aria-expanded={isVisible}
                >
                  {isVisible ? "Hide Chat" : "Show Chat"}
                </Button>
              </div>
            </div>
            <div className="col col-lg-2">
              <div className="btn-collapse">
                <Button className="w-100 position-relative top-0 end-0 px-2">
                  Finish Interaction
                </Button>
              </div>
            </div>
          </div>
          <Collapse in={isVisible}>
            <div id="collapse-chat-text">
              <Chat botChat={[transcript]} userChat={[transcript]}></Chat>
            </div>
          </Collapse>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}

export default Transcript;
