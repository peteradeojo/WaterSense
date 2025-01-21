import axios from "axios";
import { io } from "socket.io-client";

// Base URL for your backend
const BASE_URL = "https://watersense.up.railway.app";
const socket = io("https://watersense.up.railway.app"); // Server URL

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

// Example: Get Leaderboard
export const getLeaderboard = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/sessions/${code}`);
    return response.data["session"]["players"];
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const startGame = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/sessions/start`, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

// Example: Join Room
export const joinRoom = async (payload) => {
  try {
    const response = await axios.post(`${BASE_URL}/sessions/join`, payload);
    socket.emit("join-room", {
      username: payload.username,
      room_code: payload.code,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
