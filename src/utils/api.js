import axios from "axios";

const apiBaseUrl = "https://rickandmortyapi.com/api/";

const episodeEndpoint = (page) => `${apiBaseUrl}/episode/?page=${page}}`;
const characterEndpoint = (page) => `${apiBaseUrl}/character/?page=${page}}`;

const movieApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchEpisodes = (page) => {
  return movieApiCall(episodeEndpoint(page));
};

export const fetchCharacters = (page) => {
  return movieApiCall(characterEndpoint(page));
};

export const searchEpisode = (params) => {
  return movieApiCall(episodeEndpoint, params);
};

export const searchCharacter = (params) => {
  return movieApiCall(characterEndpoint, params);
};
