export const generateVoicePostAudio = async (text, languageCode, voiceName, gender) => {
  try {
    const response = await fetch("http://localhost:5000/api/voicepost/generate-audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, languageCode, voiceName, gender }),
    });
    const data = await response.json();
    return data.audioUrl;
  } catch (error) {
    console.error("Error generating audio:", error);
  }
};
