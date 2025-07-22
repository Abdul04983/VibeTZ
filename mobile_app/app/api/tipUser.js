import axios from "axios";

export const tipUser = async ({ toUserId, amount }) => {
  try {
    const res = await axios.post("/api/tip", {
      toUserId,
      amount,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
