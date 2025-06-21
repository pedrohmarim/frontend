import axios from 'axios';

export async function translateToEnglish(text: string): Promise<string> {
  const query = encodeURIComponent(text);

  const url = `https://api.mymemory.translated.net/get?q=${query}&langpair=pt|en`;

  try {
    const response = await axios.get(url);
    return response.data.responseData.translatedText;
  } catch {
    return text;
  }
}
