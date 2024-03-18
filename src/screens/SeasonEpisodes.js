/*

import {
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
const API = "https://rickandmortyapi.com/api/";

class SeasonEpisodesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      currentPage: 1,
      totalPages: 0,
    };
  }

  getCharacters(page = 1) {
    axios
      .get(`${API}episode/?page=${page}`)
      .then((response) => {
        let newData = this.state.characters;
        let data = (response.data && response.data.results) || [];
        data.map((data) => {
          newData.push(data);
        });

        this.setState({
          characters: newData,
          totalPages: (response.data && response.data.info.pages) || 0,
          currentPage: page,
        });
      })
      .catch((error) => {
        console.log("error: ", error);
        if (error.response && error.response.status === 404) {
          this.setState({
            error: true,
          });
        }
      });
  }
  componentDidMount() {
    this.getCharacters();
  }

  render() {
    return (
      <View className="flex-1">
        <View style={styles.container}>
          <StatusBar style="dark" />
          <View className="flex-row justify-between items-center mx-4 mg-4">
            <View className="border-2 border-white rounded-full overflow-hidden">
              <Image
                source={require("../../assets/images/me.jpeg")}
                style={{ width: 45, height: 45 }}
                resizeMode="cover"
              />
            </View>
          </View>
          <View className="flex-row space-x-4">
            <BellIcon size={30} strokeWidth={1} color={"black"} />
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchScreen")}
            >
              <MagnifyingGlassIcon size={30} strokeWidth={1} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            style={styles.list}
            data={this.state.characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.row}>
                  <Image
                    source={require("../../assets/images/splash.jpg")}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <View style={[styles.column, { marginLeft: 10 }]}>
                    <Text style={[styles.text, { fontWeight: "bold" }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.text, { fontWeight: "normal" }]}>
                      {item.episode}
                    </Text>
                    <Text style={[styles.text, { fontWeight: "normal" }]}>
                      {item.created}
                    </Text>
                  </View>
                </View>
              );
            }}
            ListFooterComponent={() => {
              if (this.state.error) {
                return (
                  <View style={styles.refreshContainer}>
                    <Text style={styles.refreshText}>
                      Başka bölüm yayınlanmadı
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.refreshContainer}>
                    <Text style={styles.refreshText}>Pull Up to Refresh</Text>
                  </View>
                );
              }
            }}
            onEndReachedThreshold={0}
            onEndReached={() => this.getCharacters(this.state.currentPage + 1)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: { flex: 1, width: "100%", padding: 10, marginTop: 10 },
  image: { width: 80, height: 80 },
  row: { flex: 1, flexDirection: "row", margin: 10 },
  column: { flex: 1, flexDirection: "column", justifyContent: "flex-start" },
  text: { fontSize: 18 },
  refreshContainer: {
    backgroundColor: "#97ce4c",
    height: 50,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  refreshText: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "normal",
    color: "#ffffff",
  },
});

export default SeasonEpisodesScreen;


*/
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const API = "https://rickandmortyapi.com/api/episode/";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const height = (windowHeight - 20) / 2;
const width = (windowWidth - 20) / 2;
const EpisodeListScreen = ({ route }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { episodeLength } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(`${API}${episodeLength}`);
        setEpisodes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setLoading(false);
      }
    };

    fetchEpisodes();

    return () => {
      // Cleanup function
    };
  }, [episodeLength]);

  const handleEpisodePress = (episode) => {
    navigation.navigate("EpisodeDetailScreen", { episode });
  };

  const renderEpisodeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.episodeItem}
      onPress={() => handleEpisodePress(item)}
    >
      <View>
        <Image
          source={require("../../assets/images/splash.jpg")}
          style={{
            width,
            height: height * 0.35,
          }}
        />
      </View>
      <Text style={styles.episodeName}>{item.name}</Text>
      <Text style={styles.episodeInfo}>{item.episode}</Text>
      <Text style={styles.episodeInfo}>{item.air_date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={episodes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEpisodeItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  list: { flex: 1, width: "100%", padding: 10, marginTop: 10 },
  image: { width: 80, height: 80 },
  row: { flex: 1, flexDirection: "row", margin: 10 },
  column: { flex: 1, flexDirection: "column", justifyContent: "flex-start" },
  episodeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  episodeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  episodeInfo: {
    fontSize: 16,
    color: "#666",
  },
});

export default EpisodeListScreen;
