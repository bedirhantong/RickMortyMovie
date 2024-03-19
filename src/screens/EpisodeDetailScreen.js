import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import axios from "axios";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const height = (windowHeight - 10) / 2;
const width = (windowWidth - 10) / 2;
const EpisodeDetailScreen = ({ route }) => {
  const { episode } = route.params;
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(episode.url);
        const characterUrls = response.data.characters;
        const characterPromises = characterUrls.map(async (characterUrl) => {
          const characterResponse = await axios.get(characterUrl);
          return characterResponse.data;
        });
        const charactersData = await Promise.all(characterPromises);
        setCharacters(charactersData);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();

    return () => {};
  }, [episode]);

  return (
    <View className="flex-1 justify-end items-center space-y-10 relative">
      <StatusBar style="dark"></StatusBar>
      {}
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Image
            source={require("../../assets/images/splash.jpg")}
            style={{
              width,
              height: height * 0.75,
            }}
          />
        </View>
        <Text style={styles.title}>{episode.name}</Text>
        <Text style={styles.subtitle}>Episode: {episode.episode}</Text>
        <Text style={styles.subtitle}>Air Date: {episode.air_date}</Text>
        <View style={styles.characterContainer}>
          {characters.map((character) => (
            <View key={character.id} style={styles.characterItem}>
              <Image
                source={{ uri: character.image }}
                style={styles.characterImage}
              />
              <Text style={styles.characterName}>{character.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  characterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  characterItem: {
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  characterName: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default EpisodeDetailScreen;
