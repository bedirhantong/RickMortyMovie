import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import axios from "axios";
import { HeartIcon } from "react-native-heroicons/outline";

const CharacterDetailScreen = ({ route }) => {
  const { character } = route.params;
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(character.url);
        const episodeUrls = response.data.episode;
        const episodePromises = episodeUrls.map(async (episodeUrl) => {
          const episodeResponse = await axios.get(episodeUrl);
          return episodeResponse.data;
        });
        const episodeData = await Promise.all(episodePromises);
        setEpisodes(episodeData);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();

    return () => {};
  }, [character]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: character.image }}
            style={styles.characterImage}
          />
          <HeartIcon color={"black"} />
        </View>
        <Text style={styles.title}>{character.name}</Text>
        <Text style={styles.subtitle}>Status: {character.status}</Text>
        <Text style={styles.subtitle}>Species: {character.species}</Text>
        <Text style={styles.subtitle}>Gender: {character.gender}</Text>
        <View style={styles.episodeContainer}>
          {episodes.map((episode) => (
            <View key={episode.id} style={styles.episodeItem}>
              <Text style={styles.episodeName}>
                {episode.episode} {episode.name}
              </Text>
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
    marginTop: 50,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: { flex: 1, flexDirection: "row", margin: 10 },
  column: { flex: 1, flexDirection: "column", justifyContent: "flex-start" },
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
  episodeName: {
    fontSize: 16,
    textAlign: "justify",
  },
});

export default CharacterDetailScreen;
