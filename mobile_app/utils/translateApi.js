import axios from "axios";

const API_URL = "http://localhost:5000/api/translate";

export const translateText = async (text, targetLang, token) => {
  try {
    const res = await axios.post(
      API_URL,
      { text, to: targetLang },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data.translated;
  } catch (error) {
    console.error("Translate error:", error);
    return text; // Return original text if fail
  }
};
