
import axios from 'axios';

// Base URL for your backend
const BASE_URL = "https://watersense.up.railway.app";

// Example: Create Room
export const createRoom = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/sessions`);
    return response.data["session"]["code"];
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

// Example: Join Room
export const joinRoom = async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/sessions/join`, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  };

