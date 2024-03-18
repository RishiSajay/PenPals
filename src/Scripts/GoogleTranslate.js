import axios from 'axios';

const {VITE_REACT_APP_CREDENTIALS} = import.meta.env;
let CREDENTIALS;
if (VITE_REACT_APP_CREDENTIALS) {
    CREDENTIALS = JSON.parse(VITE_REACT_APP_CREDENTIALS);
}

const API_KEY = CREDENTIALS.private_key;
const API_URL = 'https://translation.googleapis.com/language/translate/v2';

const translateText = async (text) => {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        q: text,
        target: 'en',
        source: 'fr',
      }
    );
  
    return response.data.data.translations[0].translatedText;
  };
  
  export default translateText;