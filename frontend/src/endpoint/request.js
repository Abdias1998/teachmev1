import React from "react";
import axios from "axios";

// const api = "https://teachme-1xw7.onrender.com/v1";
const api = "http://localhost:7200/v1";

const request = {
  register: `${api}/auth/register`,
  login: `${api}/auth/login`,
  forget: `${api}/auth/forget`,
  reset: `${api}/auth/reset`,
  video: `${api}/video/preach`,
  user_info: `${api}/user_info`,
};
export default request;

// Remplace cela par l'URL réelle de ton serveur
export const addToFavorites = async (userId, videoId) => {
  const res = await axios.post(`${api}/${userId}/favorites/${videoId}`);
  const data = await res.data;
  return data;
};
export const getUser = async () => {
  const res = await axios.get(`${request.user_info}`, {
    withCredentials: true,
  });
  const data = await res.data;
  return data;
};
export const getVideo55 = async () => {
  const res = await axios.get(`${request.video}/videos/top55`);
  const data = await res.data;
  return data;
};
export const getVideoSubtitles = async () => {
  const res = await axios.get(`${request.video}/videos/subtitles`);
  const data = await res.data;
  return data;
};
export const getVideoUnWatched = async (userId) => {
  try {
    const response = await axios.get(`${request.video}/unwatched/${userId}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des prédications non regardées:",
      error
    );
    throw error;
  }
};
export const getVideo = async () => {
  try {
    const response = await axios.get(`${request.video}/read`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des prédications non regardées:",
      error
    );
    throw error;
  }
};
export const getUnwatchedPreaches = async (userId) => {
  try {
    const response = await axios.get(`/preaches/unwatched/${userId}`);
    return response.data.unwatchedPreaches;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des prédications non regardées:",
      error
    );
    throw error;
  }
};

// Ajoute d'autres fonctions de requête ici
