import axios from "axios";

const API = "http://ineddev01:3333/api";

export const suggestAddress = (query) =>
    axios.get(`https://alphaere.enrichedrealestate.com/SuggestAddress?address=${query}`);

export const compareProperty = (data) =>
  axios.post(`${API}/compare`, data);