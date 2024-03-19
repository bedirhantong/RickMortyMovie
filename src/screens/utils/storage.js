import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_CHARACTERS_KEY = "@favoriteCharacters";

export const getFavoriteCharacters = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITE_CHARACTERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error(
      "Error getting favorite characters from AsyncStorage:",
      error
    );
    return [];
  }
};

export const setFavoriteCharacters = async (favoriteCharacters) => {
  try {
    await AsyncStorage.setItem(
      FAVORITE_CHARACTERS_KEY,
      JSON.stringify(favoriteCharacters)
    );
  } catch (error) {
    console.error("Error setting favorite characters to AsyncStorage:", error);
  }
};
