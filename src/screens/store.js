import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./reducers/charactersSlice";

export default configureStore({
  reducer: {
    characters: charactersReducer,
  },
});
