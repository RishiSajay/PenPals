import { useEffect, useState, useCallback } from "react";
import "./App.css";
import microphoneImg from "./assets/microphone.png";
import openChat from "./assets/chat.svg";
import EmmaStatic from "./assets/Emma Static.png";
import axios from "axios";
import Definition from "./Components/Definition";
import { ProgressBar } from "react-bootstrap";
import { SessionsClient } from '@google-cloud/dialogflow';
import dialogflow from '@google-cloud/dialogflow';

import OpenAI from "openai";

const { VITE_OPENAI_API_KEY } = import.meta.env;

const cuisine : Record<string, string> = {
  "Le café dispose-t-il d'une terrasse extérieure?" : "restaurant",
  "Le café peut-il organiser des repas d'affaires?" : "restaurant",
  "Acceptez-vous les groupes pour des événements privés" : "restaurant",
  "Emma, quel est le meilleur endroit pour s'asseoir au café" : "restaurant",
  "Emma, quel est ton plat préféré à servir" : "restaurant",
  "Est-ce que le café accueille des expositions d'art ou des artistes locaux" : "restaurant",
  "Est-ce que le café de la Rose a un programme de fidélité" : "restaurant",
  "Est-ce que le café de la Rose accueille des événements littéraires" : "restaurant",
  "Est-ce que le café propose des soirées musicales" : "restaurant",
  "Est-ce que le café vend des produits artisanaux locaux" : "restaurant",
  "Est-ce que le Wi-Fi est disponible au café" : "restaurant",
  "Est-ce que le Wi-Fi est disponible pour les clients" : "restaurant",
  "Est-il possible de privatiser le café pour un événement" : "restaurant",
  " Est-il possible de réserver une table" : "restaurant",
  "Le café a-t-il un espace dédié pour lire ou travailler" : "restaurant",
  "Le café a-t-il une bibliothèque ou des livres à disposition" : "restaurant",
  "Le café a-t-il une option de privatisation pour les événements" : "restaurant",
  "Le café a-t-il une option pour un dîner romantique" : "restaurant",
  "Le café a-t-il une terrasse extérieure" : "restaurant",
  "Le café de la Rose a-t-il des journaux ou des magazines à lire" : "restaurant",
  " Le café de la Rose a-t-il des partenariats avec des producteurs locaux" : "restaurant",
  "Le café de la Rose a-t-il été récompensé ou reconnu" : "restaurant",
  "Le café de la Rose propose-t-il des événements pour les amateurs de littérature" : "restaurant",
  "Le café de la Rose vend-il des produits locaux" : "restaurant",
  "Le café dispose-t-il d'espaces privés pour des réunions" : "restaurant",
  "Le café dispose-t-il d'un espace pour les réunions d'affaires" : "restaurant",
  "Le café dispose-t-il d'une connexion Wi-Fi gratuite" : "restaurant",
  "Le café dispose-t-il d'une salle pour des expositions" : "restaurant",
  " Le café dispose-t-il d'une terrasse extérieure" : "restaurant",
  "Le café est-il accessible aux personnes à mobilité réduite" : "restaurant",
  "Le café est-il adapté aux familles avec enfants" : "restaurant",
  "Le café est-il adapté pour lire ou étudier" : "restaurant",
  " Le café est-il ouvert les jours fériés" : "restaurant",
  "Le café offre-t-il des services traiteur" : "restaurant",
  "Le café offre-t-il un service de commande pour des occasions spéciales" : "restaurant",
  "Le café organise-t-il des ateliers culinaires" : "restaurant",
  "Le café organise-t-il des dégustations de vin" : "restaurant",
  "Le café organise-t-il des soirées thématiques" : "restaurant",
  "Le café peut-il accueillir des personnes en fauteuil roulant" : "restaurant",
  " Le café propose-t-il des cadeaux ou des cartes-cadeaux" : "restaurant",
  "Le café propose-t-il des conférences ou des rencontres avec des auteurs" : "restaurant",
  "Le café propose-t-il des livraisons à domicile" : "restaurant",
  " Le café propose-t-il des options bio" : "restaurant",
  "Le café propose-t-il des plats à emporter" : "restaurant",
  " Le café propose-t-il des repas pour les grandes occasions" : "restaurant",
  "Le café propose-t-il des repas rapides" : "restaurant",
  " Le café propose-t-il des spécialités de la région de Provence" : "restaurant",
  " Le café propose-t-il des spécialités locales" : "restaurant",
  "Le café propose-t-il des spécialités végétariennes" : "restaurant",
  " Le café propose-t-il un menu pour les enfants" : "restaurant",
  " Le café utilise-t-il des produits de saison" : "restaurant",
  "Le café vend-il des produits faits maison à emporter" : "restaurant",
  "Le café vend-il ses propres produits" : "restaurant",
  " Le menu change-t-il fréquemment" : "restaurant",
  " Le menu change-t-il selon les saisons" : "restaurant",
  "Le menu du café change-t-il fréquemment" : "restaurant",
  "Le menu inclut-il des plats typiques d'autres régions de France" : "restaurant",
  "Le menu inclut-il des plats végétaliens" : "restaurant",
  "Les animaux de compagnie sont-ils autorisés au café" : "restaurant",
  " Les enfants ont-ils un espace de jeux au café" : "restaurant",
  "Les enfants ont-ils un menu spécial" : "restaurant",
  " Les enfants peuvent-ils participer à des ateliers de pâtisserie" : "restaurant",
  "Les enfants sont-ils bienvenus au café" : "restaurant",
  " Les produits sont-ils frais et locaux" : "restaurant",
  " Les produits utilisés sont-ils locaux" : "restaurant",
  "Les réservations sont-elles nécessaires pour le weekend" : "restaurant",
  " Les réservations sont-elles recommandées pour le dîner" : "restaurant",
  " Offrez-vous des services de traiteur pour des événements" : "restaurant",
  "Organisez-vous des dégustations de vins ou de fromages" : "restaurant",
  "Organisez-vous des événements culturels au café" : "restaurant",
  "Organisez-vous des événements pour les enfants" : "restaurant",
  "Peut-on acheter des produits locaux au café" : "restaurant",
  " Peut-on organiser des ateliers ou des cours au café" : "restaurant",
  " Peut-on organiser des repas d'affaires au café" : "restaurant",
  "Peut-on organiser des événements privés au café" : "restaurant",
  "Peut-on organiser un brunch de groupe au café" : "restaurant",
  "Peut-on organiser un dîner romantique au café" : "restaurant",
  "Peut-on organiser une dégustation de pâtisseries" : "restaurant",
  "Peut-on réserver le café pour des événements" : "restaurant",
  " Peut-on réserver le café pour une soirée privée" : "restaurant",
  "Peut-on réserver une table pour une date spécifique" : "restaurant",
  "Peut-on venir avec des poussettes ou des landaus" : "restaurant",
  "Peut-on écouter de la musique française traditionnelle au café" : "restaurant",
  "Pouvez-vous me parler de l'ambiance du Café de la Rose" : "restaurant",
  "Pouvons-nous acheter les produits de votre café" : "restaurant",
  "Pouvons-nous venir avec des enfants en bas âge" : "restaurant",
  "Proposez-vous des événements culturels en lien avec la gastronomie" : "restaurant",
  "Puis-je amener mon propre gâteau pour une célébration" : "restaurant",
  "Puis-je organiser un petit événement au café" : "restaurant",
  "Puis-je trouver des souvenirs du café à acheter" : "restaurant",
  " Quels sont vos horaires d'ouverture" : "restaurant",
  "Votre café est-il engagé dans le développement durable" : "restaurant",
  "Y a-t-il des soirées poésie ou lectures au café" : "restaurant",
  " Y a-t-il des événements culturels organisés au café" : "restaurant",
  "Y a-t-il une option de plats à emporter" : "restaurant",
  " Y a-t-il une spécialité de Provence que vous recommandez" : "restaurant",
  "Avez-vous des options sans sucre ajouté" : "food",
  "Avez-vous des recommandations pour un déjeuner léger" : "food",
  "Avez-vous des recommandations pour un plat léger" : "food",
  "Avez-vous des spécialités du jour" : "food",
  "Disposez-vous d'options pour les régimes hypocaloriques" : "food",
  "Disposez-vous d'un menu pour enfants" : "food",
  "Emma, as-tu une pâtisserie française favorite" : "food",
  "Emma, pouvez-vous préparer un menu surprise" : "food",
  "Emma, pouvez-vous préparer un plat sans certains ingrédients" : "food",
  "Emma, quel est le meilleur dessert pour un amateur de chocolat" : "food",
  "Emma, quel est le plat que vous recommanderiez pour un premier visiteur" : "food",
  "Emma, quel est votre dessert français préféré" : "food",
  "Emma, quel est votre plat français préféré" : "food",
  "Emma, quel est votre plat provençal préféré" : "food",
  "Emma, quel est votre plat préféré au café" : "food",
  "Emma, quel est votre pâtisserie préférée dans le café" : "food",
  " Emma, quelle est votre recommandation pour un dessert" : "food",
  "Emma, êtes-vous impliquée dans la création des plats du menu" : "food",
  "Est-ce que Emma peut aider à choisir un plat pour un régime spécifique" : "food",
  " Est-ce que Emma peut recommander un plat pour un régime spécifique" : "food",
  "Est-ce que le café a des options pour les intolérants au lactose " : "food",
  "Est-ce que le café a des options pour les régimes spéciaux" : "food",
  " Est-ce que le café de la Rose a un plat du jour" : "food",
  "Est-ce que le café organise des ateliers ou des cours de cuisine" : "food",
  "Est-ce que le café propose des ateliers pour enfants" : "food",
  "Est-ce que le café propose des repas à thème régional" : "food",
  "Le café a-t-il des options de plats chauds et froids" : "food",
  "Le café a-t-il des options pour les cœliaques" : "food",
  "Le café a-t-il des options pour les personnes allergiques aux noix" : "food",
  " Le café a-t-il des options pour les régimes spécifiques" : "food",
  " Le café a-t-il des options végétaliennes pour le petit-déjeuner" : "food",
  "Le café a-t-il des plats inspirés par d'autres cultures" : "food",
  " Le café a-t-il des spécialités de saison" : "food",
  "Le café a-t-il un menu du jour" : "food",
  "Le café a-t-il un plat du jour" : "food",
  " Le café a-t-il une option de menu pour les végétariens" : "food",
  "Le café de la Rose a-t-il des options de petit-déjeuner" : "food",
  "Le café de la Rose a-t-il des options sans gluten" : "food",
  "Le café de la Rose a-t-il des plats sans lactose" : "food",
  "Le café de la Rose a-t-il des recettes traditionnelles françaises" : "food",
  "Le café de la Rose a-t-il un menu saisonnier" : "food",
  "Le café de la Rose a-t-il un plat signature" : "food",
  "Le café de la Rose propose-t-il des formules petit-déjeuner" : "food",
  "Le café de la Rose propose-t-il des plats pour les enfants" : "food",
  "Le café de la Rose propose-t-il des plats typiques de Provence" : "food",
  "Le café de la Rose propose-t-il des viennoiseries" : "food",
  " Le café de la Rose vend-il ses propres créations culinaires" : "food",
  "Le café offre-t-il des alternatives de sucre" : "food",
  " Le café offre-t-il des cours de pâtisserie" : "food",
  "Le café offre-t-il des options pour les intolérants au gluten" : "food",
  " Le café offre-t-il des options véganes" : "food",
  "Le café offre-t-il des plats à partager pour deux personnes" : "food",
  "Le café offre-t-il une expérience gastronomique provençale authentique" : "food",
  "Le café propose-t-il des desserts sans gluten" : "food",
  " Le café propose-t-il des options végétariennes" : "food",
  "Le café propose-t-il des plats sans produits laitiers" : "food",
  " Le café propose-t-il des salades de fruits frais" : "food",
  "Le café propose-t-il des sandwichs ou des paninis" : "food",
  " Le café propose-t-il des spécialités de boulangerie françaises" : "food",
  " Le café sert-il des crêpes" : "food",
  " Le café sert-il des plats biologiques" : "food",
  " Le café sert-il des quiches variées" : "food",
  " Le café utilise-t-il des ingrédients frais et locaux" : "food",
  "Le café utilise-t-il des ingrédients équitables" : "food",
  "Le menu inclut-il des plats sans lactose" : "food",
  " Les desserts du café sont-ils faits maison" : "food",
  "Les produits de pâtisserie sont-ils faits maison" : "food",
  "Les repas sont-ils préparés sur place" : "food",
  "Peut-on acheter des pâtisseries françaises à emporter" : "food",
  " Peut-on acheter les pâtisseries en grande quantité" : "food",
  "Peut-on apporter son gâteau d'anniversaire au café" : "food",
  "Peut-on avoir des plats à partager" : "food",
  "Peut-on emporter des pâtisseries en grande quantité" : "food",
  "Peut-on trouver des options sans sucre au café" : "food",
  "Peut-on trouver des produits sans sel au café" : "food",
  "Pouvons-nous commander des plats pour des occasions spéciales" : "food",
  " Proposez-vous des formules déjeuner" : "food",
  " Puis-je avoir la liste des ingrédients d'un plat" : "food",
  "Puis-je trouver des plats typiques de la Provence au café" : "food",
  "Quelle est la pâtisserie la plus populaire du café" : "food",
  "Quelle est la spécialité de la maison" : "food",
  " Y a-t-il des options de desserts sans sucre" : "food",
  "Y a-t-il des options de repas légers" : "food",
  " Y a-t-il des options de repas pour les sportifs" : "food",
  "Y a-t-il des options halal ou casher au menu" : "food",
  "Y a-t-il des options pour les personnes ayant des restrictions alimentaires" : "food",
  "Y a-t-il des options véganes au menu" : "food",
  "Y a-t-il des options végétariennes au café" : "food",
  " Y a-t-il des plats pour les amateurs de viande" : "food",
  "Y a-t-il des plats sans gluten disponibles" : "food",
  "Y a-t-il des spécialités sucrées pour les personnes diabétiques" : "food",
  "Y a-t-il des spécialités sucrées pour les végétaliens" : "food",
  "Emma, pouvez-vous recommander un vin français?" : "beverages",
  "Avez-vous des spécialités de café froid" : "beverages",
  "Avez-vous une sélection de thés" : "beverages",
  "Emma, proposez-vous des boissons locales" : "beverages",
  "Emma, quel est le meilleur café du menu" : "beverages",
  "Emma, quel est le meilleur thé du menu" : "beverages",
  "Emma, quel est votre vin préféré du menu" : "beverages",
  " Est-ce qu'Emma peut nous recommander un vin" : "beverages",
  "Est-ce que le café dispose d'un choix de vins français" : "beverages",
  "Est-ce que le café propose des formules pour le thé de l'après-midi" : "beverages",
  " Est-ce que le café propose des jus de fruits frais pressés" : "beverages",
  "Est-ce que le café vend ses propres mélanges de café ou de thé" : "beverages",
  " Le café a-t-il des spécialités de café froid" : "beverages",
  "Le café a-t-il une sélection de thés" : "beverages",
  "Le café a-t-il une sélection de vins biologiques" : "beverages",
  "Le café a-t-il une sélection de vins de la région Provence" : "beverages",
  "Le café de la Rose offre-t-il des spécialités de café" : "beverages",
  " Le Café de la Rose propose-t-il des boissons alcoolisées" : "beverages",
  "Le café de la Rose propose-t-il des thés aromatisés" : "beverages",
  "Le café offre-t-il des alternatives au lait traditionnel" : "beverages",
  "Le café offre-t-il des options bio pour les boissons" : "beverages",
  " Le café propose-t-il des alternatives de café pour ceux qui n'aiment pas le café" : "beverages",
  "Le café propose-t-il des boissons artisanales" : "beverages",
  " Le café propose-t-il des boissons artisanales locales" : "beverages",
  "Le café propose-t-il des boissons sans alcool" : "beverages",
  "Le café propose-t-il des boissons spéciales en hiver" : "beverages",
  " Le café propose-t-il des boissons végétaliennes" : "beverages",
  "Le café propose-t-il des jus de fruits frais" : "beverages",
  " Le café propose-t-il des options sans caféine" : "beverages",
  "Le café sert-il des boissons énergisantes" : "beverages",
  "Le café sert-il des boissons énergétiques ou des smoothies" : "beverages",
  "Le café vend-il ses propres mélanges de café" : "beverages",
  "Les boissons sont-elles biologiques" : "beverages",
  " Les boissons sont-elles préparées à la commande" : "beverages",
  "Offrez-vous des boissons spéciales pendant les fêtes" : "beverages",
  " Peut-on apporter son vin au café" : "beverages",
  " Peut-on commander des boissons alcoolisées" : "beverages",
  "Peut-on commander des boissons pour accompagner les pâtisseries" : "beverages",
  " Peut-on commander des boissons sans sucre" : "beverages",
  "Peut-on commander des boissons spéciales" : "beverages",
  " Peut-on commander des boissons à base de plantes" : "beverages",
  "Peut-on commander du café à emporter" : "beverages",
  "Peut-on déguster des vins locaux au café" : "beverages",
  " Pouvons-nous commander des boissons spéciales au café" : "beverages",
  "Proposez-vous des alternatives au lait de vache" : "beverages",
  "Proposez-vous des boissons sans alcool" : "beverages",
  "Y a-t-il des options de café biologique au café" : "beverages",
  " Y a-t-il des options de café décaféiné" : "beverages",
  "Avez-vous des options de paiement sans contact" : "paying",
  "Est-ce que le café de la Rose fait des réductions pour les groupes" : "paying",
  "Faites-vous des réductions pour les étudiants ou les seniors" : "paying",
  "Le café a-t-il des offres pour les anniversaires" : "paying",
  "Le café de la Rose fait-il des réductions pour les anciens clients" : "paying",
  "Peut-on payer en espèces au café" : "paying",
  " Y a-t-il des réductions pour les grandes réservations" : "paying",
  "Y a-t-il des réductions pour les réservations de groupe" : "paying",
  "Emma, pourrais-je avoir une recommandation de livre français" : "social",
  "Emma, pouvez-vous recommander un bon livre français" : "social",
  " Emma, pouvez-vous recommander un livre français" : "social",
};

function removeFrenchDiacritics(str: string): string {
  return str.normalize("NFD").trim().toLowerCase()
            .replace(/[^\u0000-\u007E]/g, "")  // Remove non-ASCII characters
            .replace(/[àáâãäå]/g, "a")
            .replace(/[ç]/g, "c")
            .replace(/[èéêë]/g, "e")
            .replace(/[ìíîï]/g, "i")
            .replace(/[ñ]/g, "n")
            .replace(/[òóôõö]/g, "o")
            .replace(/[ùúûü]/g, "u")
            .replace(/[ýÿ]/g, "y")
            .replace(/[œ]/g, "oe")
            .replace(/[^\w\s]|_/g, "");  // Handle the "œ" character
}

//restaurant food beverages paying social


function getIntentGroup(userInput : string) {
  userInput = removeFrenchDiacritics(userInput);
  for (const [key, value] of Object.entries(cuisine)) {
    // console.log(removeFrenchDiacritics(key));
    // console.log(removeFrenchDiacritics(userInput));
    if (removeFrenchDiacritics(key) === userInput) {
        return value;
    }
  }
  
  return "no intent found";
} 

const openai = new OpenAI({
  apiKey: VITE_OPENAI_API_KEY, // Access the environment variable
  dangerouslyAllowBrowser: true,
});

//const speechFile = path.resolve("./assets/speech.mp3");

// function speak_backup(text: string): void {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "fr-FR";
//   window.speechSynthesis.speak(utterance);
// }

async function speak(text: string): Promise<void> {
  const mp3: any = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: text,
  });

  console.log(mp3);

  const arrayBuffer = await mp3.arrayBuffer();
  const audioBlob = new Blob([arrayBuffer], { type: "audio/mp3" });
  const audioUrl = URL.createObjectURL(audioBlob);

  // Use the HTML Audio API to play the audio
  const audio = new Audio(audioUrl);
  audio.play();

  audio.onended = () => {
    URL.revokeObjectURL(audioUrl);
  };
  // const buffer: Buffer = Buffer.from(await mp3.arrayBuffer());
  // await fs.promises.writeFile(speechFile, buffer);
}
// const sessionId = '12345'; // You can use a random or user-specific session id
// const projectId = 'emma-lefebvre-vupd'; // Your Google Cloud project id
// const sessionClient = new dialogflow.SessionsClient();
interface DialogflowResponseEventDetail {
  response: {
    queryResult?: {

      fulfillmentText: string;
      intent: {
        displayName: string;
      }
    };
  };
}

let currWords = 0;

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const user = urlParams.get("user");
  const intent = urlParams.get("intent");
  console.log(intent);

  const [isListening, setIsListening] = useState(false);
  const [showCard, setShowCard] = useState("");
  const [definition, setDefinition] = useState("");
  const [wordsT, setWordsT] = useState(0);
  const [wordsS, setWordsS] = useState(0);
  const [wordsH, setWordsH] = useState(0);
  const [WSG, setWSG] = useState(0);
  const [WTG, setWTG] = useState(0);
  const [HG, setHG] = useState(0);
  const [Social, setSocial] = useState(0);
  const [SocialG, setSocialG] = useState(3);
  const [Restaurant, setRestaurant] = useState(0);
  const [RestaurantG, setRestaurantG] = useState(96);
  const [Food, setFood] = useState(0);
  const [FoodG, setFoodG] = useState(92);
  const [Beverages, setBeverages] = useState(0);
  const [BeveragesG, setBeveragesG] = useState(48);
  const [Paying, setPaying] = useState(0);
  const [PayingG, setPayingG] = useState(8);

  const [userVerified, setUserVerified] = useState(false);
  const checkUserAuth = (user: any) => {
    if (user == null || user == "null") {
      window.location.href = "/";
    }
  };

  if (!userVerified) {
    checkUserAuth(user);
    setUserVerified(true);
  }

  const { VITE_REACT_APP_KEY } = import.meta.env;
  function getCurrentGoals() {
    const task = "read_goals";
    axios
      .post(
        "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
        {
          user,
          task,
        }
      )
      .then((res) => {
        setWordsS(Number(res.data.result["WS"])),
          setWordsT(Number(res.data.result["WT"])),
          setWordsH(Number(res.data.result["H"])),
          setWSG(Number(res.data.result["WSG"])),
          setWTG(Number(res.data.result["WTG"])),
          setHG(Number(res.data.result["HG"]));
          //setRestaurant(Number(res.data.result["Restaurant"])),
          //setRestaurantG(Number(res.data.result["RestaurantG"])),
          //setBeverages(Number(res.data.result["Beverages"])),
          //setBeveragesG(Number(res.data.result["BeveragesG"])),
          //setFood(Number(res.data.result["Food"])),
          //setFoodG(Number(res.data.result["FoodG"])),
          //setSocial(Number(res.data.result["Social"])),
          //setSocialG(Number(res.data.result["SocialG"])),
          //setPaying(Number(res.data.result["Paying"])),
          //setPayingG(Number(res.data.result["PayingG"]));
      })
      .catch((err) => console.log(err));
  }

  //getCurrentGoals();

  function updateWSLocal(words: number) {
    setWordsS((wordsS) => wordsS + words);
  }

  function updateHLocal(words: number) {
    setWordsH((wordsH) => wordsH + words);
  }

  function updateWTLocal(words: number) {
    setWordsT((wordsT) => wordsT + words);
  }
  function updateIntentLocal(words: number, intentGroup: string) {
    switch(intentGroup) {
      case "restaurant":
        updateRestaurantLocal(words);
        break;
      case "beverages":
        updateBeveragesLocal(words);
        break;
      case "social":
        updateSocialLocal(words);
        break;
      case "paying":
        updatePayingLocal(words);
        break;
      case "food":
        updateFoodLocal(words);
        break;
    }
  }

  function updateRestaurantLocal(words: number) {
    setRestaurant((Restaurant) => Restaurant + words);
  }

  function updateBeveragesLocal(words: number) {
    setBeverages((Beverages) => Beverages + words);
  }

  function updateFoodLocal(words: number) {
    setFood((Food) => Food + words);
  }

  function updatePayingLocal(words: number) {
    setPaying((Paying) => Paying + words);
  }

  function updateSocialLocal(words: number) {
    setSocial((Social) => Social + words);
  }

  function updateGoalsGlobal(nextPath: string) {
    const WT = wordsT.toString();
    const WS = wordsS.toString();
    const H = wordsH.toString();
    const R = Restaurant.toString();
    const B = Beverages.toString();
    const P = Paying.toString();
    const S = Social.toString();
    const F = Food.toString();


    const task = "write_goals";
    axios
      .post(
        "https://qeetqm5h08.execute-api.us-east-1.amazonaws.com/prod/resource",
        {
          WT,
          WS,
          H,
          R,
          B,
          P,
          S,
          F,
          user,
          task,
        }
      )
      .then((res) => console.log(res))
      .then(() => (window.location.href = nextPath))
      .catch((err) => console.log(err));
  }

  const updateGoalsClicked = () => {
    const nextPath = "/goals?user=" + user;
    updateGoalsGlobal(nextPath);
  };

  const endSessionClicked = () => {
    const nextPath = "/home?user=" + user;
    updateGoalsGlobal(nextPath);
  };

  const getDefinition = async (word: string) => {
    const options = {
      method: "GET",
      url: "https://translated-mymemory---translation-memory.p.rapidapi.com/get",
      params: {
        langpair: "fr|en",
        q: `${word}`,
        mt: "1",
        onlyprivate: "0",
      },
      headers: {
        "X-RapidAPI-Key": `${VITE_REACT_APP_KEY}`,
        "X-RapidAPI-Host":
          "translated-mymemory---translation-memory.p.rapidapi.com",
      },
    };
    try {
      // updateHLocal(word.split(" ").length);
      const response = await axios.request(options);
      setDefinition(response.data.matches[0].translation);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
        // update goal
        const wordsSelected = selection.split(" ").length;
        console.log("words selected: ", wordsSelected, "wordsH: ", wordsH);

        // update highlighted goal
        updateHLocal(wordsSelected);

        setShowCard(selection);
        getDefinition(selection);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mouseup", handleMouseUp);

    // Cleanup function to remove the event listener
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []); // Ensure useEffect runs only once at mount

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const messenger = document.createElement("df-messenger");
      messenger.setAttribute("intent", "WELCOME");
      messenger.setAttribute("chat-title", "Emma_Lefebvre");
      messenger.setAttribute(
        "agent-id",
        "13286b34-c09b-4081-87f5-275c91baa4df"
      );
      messenger.setAttribute("language-code", "fr");
      messenger.setAttribute(
        "chat-icon",
        `data:image/svg+xml;base64,${btoa(openChat)}`
      );
      document.body.appendChild(messenger);
      messenger.addEventListener("df-response-received", (event: Event) => {
        const customEvent = event as CustomEvent<DialogflowResponseEventDetail>;
        try {
          const fulfillmentText =
            customEvent.detail.response.queryResult?.fulfillmentText;
            const userIntent = customEvent.detail.response.queryResult?.intent?.displayName;
            const intent = userIntent ? userIntent.toString() : "defaultIntent";
            const intentGroup = getIntentGroup(intent);
            if (intentGroup != "no intent found") {
              updateIntentLocal(1, intentGroup);
            }
            
          if (fulfillmentText) {
            speak(fulfillmentText); // Assuming 'speak' is defined elsewhere in your code
          }
        } catch (error) {
          console.error("Error extracting response text: ", error);
        }
      });
      messenger.addEventListener(
        "df-user-input-entered",
        function (event: any) {
          // check number of words actually entered
          let wordsTyped = event.detail["input"].split(" ").length - currWords;
          console.log("words typed:", wordsTyped);

          // update words typed
          updateWTLocal(wordsTyped);
        }
      );
    };
    return () => {
      // Cleanup: Remove the script and messenger elements
      document.body.removeChild(script);
      const messenger = document.querySelector("df-messenger");
      if (messenger) {
        document.body.removeChild(messenger);
      }
    };
  }, []); // This is the correct ending for the useEffect hook with an empty dependency array.

  const runSpeechRecognition = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("This browser does not support Web Speech API");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr";
    recognition.start();
    setIsListening(true);

    recognition.onstart = () => {
      console.log(
        "Voice recognition started. Try speaking into the microphone."
      );
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
        const dfMessenger = document.querySelector("df-messenger");
        if (!dfMessenger || !dfMessenger.shadowRoot) {
          throw new Error("df-messenger or its shadowRoot is not accessible");
        }

        const dfMessengerChat =
          dfMessenger.shadowRoot.querySelector("df-messenger-chat");
        if (!dfMessengerChat || !dfMessengerChat.shadowRoot) {
          throw new Error(
            "df-messenger-chat or its shadowRoot is not accessible"
          );
        }

        const userInput = dfMessengerChat.shadowRoot.querySelector(
          "df-messenger-user-input"
        );
        if (!userInput || !userInput.shadowRoot) {
          throw new Error(
            "df-messenger-user-input or its shadowRoot is not accessible"
          );
        }

        const input = userInput.shadowRoot.querySelector(
          'input[type="text"]'
        ) as HTMLInputElement;
        if (!input) {
          throw new Error("Input field is not found");
        }

        input.focus();

        let wordsSpoken = transcript.split(" ").length;
        console.log("words spoken: ", wordsSpoken);

        // update words spoken
        updateWSLocal(wordsSpoken);

        currWords = wordsSpoken;

        input.value = transcript;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(
          new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
        );
        console.log(input);
        input.dispatchEvent(new Event("input", { bubbles: true }));

        // Dispatch the Enter keydown event
        input.dispatchEvent(
          new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
        );

        const sendIcon = userInput.shadowRoot.querySelector("#sendIcon");
        if (!sendIcon) {
          throw new Error("Send icon not found");
        }

        // Dispatch click event to the send icon
        const clickEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        });

        sendIcon.dispatchEvent(clickEvent);

      } catch (error) {
        console.error(
          "Error sending transcript to Dialogflow Messenger:",
          error
        );
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${EmmaStatic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative", // Ensure the .App container is positioned relatively
      }}
      onLoad={getCurrentGoals}
    >
      <div className="goals-container">
        <div className="card w-25 mt-5 border border-dark rounded">
          <div className="card-body">
            <h3 className="text-center">Goals</h3>
            <ProgressBar variant="info" now={Restaurant} max={RestaurantG} />
            Restaurant
            <ProgressBar variant="info" now={Beverages} max={BeveragesG} />
            Beverages
            <ProgressBar variant="info" now={Paying} max={PayingG} />
            Paying
            <ProgressBar variant="info" now={Food} max={FoodG} />
            Food
            <ProgressBar variant="info" now={Social} max={SocialG} />
            Social
          </div>
          <div className="container">
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" onClick={updateGoalsClicked}>
                Adjust Goals
              </button>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={endSessionClicked}>
        End Session
      </button>
      <div className="mic-container icon-10">
        <button
          className="mic-button bi bi-mic rounded-circle"
          onClick={runSpeechRecognition}
        >
          <img src={microphoneImg} alt="Microphone" />
        </button>
        {isListening ? (
          <p className="text-light">I am listening! Please speak.</p>
        ) : (
          <p className="text-light">Click the button to start talking!</p>
        )}
      </div>
      <div className="position-fixed top-0 end-0">
        {showCard != "" && (
          <Definition word={showCard} trans={definition}></Definition>
        )}
      </div>
    </div>
  );
}

export default App;
