import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import dotenv from "dotenv";
import Translate from "@google-cloud/translate";
import axios from "axios";
import translateText from "../Scripts/GoogleTranslate";

interface definitionProps {
  word: string;
}

/* IMPORTANT: Start of comment for credential issue

const {VITE_REACT_APP_CREDENTIALS} = import.meta.env;
let CREDENTIALS;
if (VITE_REACT_APP_CREDENTIALS) {
    CREDENTIALS = JSON.parse(VITE_REACT_APP_CREDENTIALS);
}

const API_KEY = CREDENTIALS.private_key;
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

let frenchWord;
translateText();

End of comment */
function Definition(props: definitionProps) {
  // const translateText = async (text : string) => {
  //     fetch(`${API_URL}?` + new URLSearchParams({
  //         q: "bonjour",
  //         target: "en",
  //         format: "text",
  //         source: "fr",
  //         model: "base",
  //         key: API_KEY
  //     }))
  //     .then((res) => {
  //         return res.json();
  //     })
  //     .then((data) => {
  //         console.log(data);
  //     })
  // };

  // const frenchWord = translateText(props.word);
  // console.log(frenchWord);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{`Word: ${props.word}`}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Definition;
