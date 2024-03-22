const axios = require('axios');

async function getDefinition(word: string) {
    const options = {
        method: 'GET',
        url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
        params: {
          langpair: 'fr|en',
          q: {word},
          mt: '1',
          onlyprivate: '0'
        },
        headers: {
          'X-RapidAPI-Key': 'db10c21a4emsh648509239c77f8dp17137ajsn730c3e7254c2',
          'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
        }
      };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}