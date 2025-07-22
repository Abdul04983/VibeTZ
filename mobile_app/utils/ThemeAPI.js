const API_URL = "http://localhost:5000/api/theme";

export const setUserTheme = async (userId, backgroundType, backgroundUrl, textColorRotationEnabled) => {
  try {
    const response = await fetch(`${API_URL}/set`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, backgroundType, backgroundUrl, textColorRotationEnabled }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error setting theme:", error);
  }
};

export const getUserTheme = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    return await response.json();
  } catch (error) {
    console.error("Error getting theme:", error);
  }
};

export const rotateTextColor = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/rotate-color`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error rotating text color:", error);
  }
};
