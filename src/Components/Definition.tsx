import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import dotenv from "dotenv";
import Translate from "@google-cloud/translate";
import axios from "axios";
import translateText from "../Scripts/GoogleTranslate";

interface definitionProps {
  word: string;
  trans: string;
}



function Definition(props: definitionProps) {
    return (
    <div>
        <Card>
        <Card.Body>
            <Card.Title>{`Word: ${props.word}`}</Card.Title>
            <Card.Text>{`Translation: ${props.trans}`}</Card.Text>
        </Card.Body>
        </Card>
    </div>
    );
}

export default Definition;
