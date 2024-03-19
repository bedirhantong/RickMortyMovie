import { createSlice } from "@reduxjs/toolkit";
import { getFavoriteCharacters, setFavoriteCharacters } from "../utils/storage";

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    favoriteCharacters: [],
  },
  reducers: {
    addFavoriteCharacter: (state, action) => {
      state.favoriteCharacters.push(action.payload);
      setFavoriteCharacters(state.favoriteCharacters);
    },
    removeFavoriteCharacter: (state, action) => {
      state.favoriteCharacters = state.favoriteCharacters.filter(
        (character) => character.id !== action.payload.id
      );
      setFavoriteCharacters(state.favoriteCharacters);
    },
    setFavoriteCharactersFromStorage: (state, action) => {
      state.favoriteCharacters = action.payload;
    },
  },
});

export const {
  addFavoriteCharacter,
  removeFavoriteCharacter,
  setFavoriteCharactersFromStorage,
} = charactersSlice.actions;

export default charactersSlice.reducer;
