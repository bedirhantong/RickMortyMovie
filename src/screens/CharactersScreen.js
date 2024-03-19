import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteCharacter,
  removeFavoriteCharacter,
} from "./reducers/charactersSlice";
import { getFavoriteCharacters, setFavoriteCharacters } from "./utils/storage";
import axios from "axios";
import { HeartIcon } from "react-native-heroicons/outline";

const API = "https://rickandmortyapi.com/api/";

const CharactersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadFavoriteCharacters = async () => {
      const favoriteCharacters = await getFavoriteCharacters();
      dispatch(addFavoriteCharacter(favoriteCharacters));
    };
    loadFavoriteCharacters();
  }, [dispatch]);

  useEffect(() => {
    const loadFavoriteCharacters = async () => {
      const favoriteCharacters = await getFavoriteCharacters();
      dispatch(setFavoriteCharactersFromStorage(favoriteCharacters));
    };
    loadFavoriteCharacters();
  }, [dispatch]);

  const fetchCharacters = async (page = 1) => {
    try {
      const response = await axios.get(`${API}character/?page=${page}`);
      const data = response.data.results || [];
      return data;
    } catch (error) {
      console.log("Error fetching characters:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters(currentPage);
      setCharacters((prevCharacters) => [...prevCharacters, ...data]);
      setTotalPages(response.data.info.pages || 0);
    };
    fetchData();
  }, [currentPage]);

  const handleAddFavorite = (character) => {
    dispatch(addFavoriteCharacter(character));
  };

  const handleRemoveFavorite = (character) => {
    dispatch(removeFavoriteCharacter(character));
  };

  const toggleFavorite = (character) => {
    const isFavorite = characters.some(
      (favCharacter) => favCharacter.id === character.id
    );
    if (isFavorite) {
      handleRemoveFavorite(character);
    } else {
      handleAddFavorite(character);
    }
  };

  const renderCharacterItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("CharacterDetailScreen", {
          character: item,
        })
      }
    >
      <View style={styles.row}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={[styles.column, { marginLeft: 10 }]}>
          <Text style={[styles.text, { fontWeight: "bold" }]}>{item.name}</Text>
          <Text style={[styles.text, { fontWeight: "normal" }]}>
            species: {item.species}
          </Text>
          <Text style={[styles.text, { fontWeight: "normal" }]}>
            subspecies: {item.type}
          </Text>
          <Text style={[styles.text, { fontWeight: "normal" }]}>
            Gender: {item.gender}
          </Text>
          <Text style={[styles.text, { fontWeight: "normal" }]}>
            Last known location: {item.status}
          </Text>
        </View>
        <TouchableWithoutFeedback onPress={() => toggleFavorite(item)}>
          <HeartIcon
            color={
              characters.some((favCharacter) => favCharacter.id === item.id)
                ? "red"
                : "black"
            }
          />
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={characters}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={renderCharacterItem}
        ListFooterComponent={() => {
          return (
            <View style={styles.refreshContainer}>
              <Text style={styles.refreshText}>Pull Up to Refresh</Text>
            </View>
          );
        }}
        onEndReachedThreshold={0}
        onEndReached={() => setCurrentPage(currentPage + 1)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: { flex: 1, width: "100%", padding: 10, marginTop: 10 },
  image: { width: 100, height: 100 },
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

export default CharactersScreen;

/*
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Component } from "react";
import axios from "axios";
import { HeartIcon } from "react-native-heroicons/outline";

const API = "https://rickandmortyapi.com/api/";
class CharactersScreen extends Component {
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
      .get(`${API}character/?page=${page}`)
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
      });
  }
  componentDidMount() {
    this.getCharacters();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate("CharacterDetailScreen", {
                    character: item,
                  })
                }
              >
                <View style={styles.row}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <View style={[styles.column, { marginLeft: 10 }]}>
                    <Text style={[styles.text, { fontWeight: "bold" }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.text, { fontWeight: "normal" }]}>
                      species: {item.species}
                    </Text>
                    <Text style={[styles.text, { fontWeight: "normal" }]}>
                      subspecies: {item.type}
                    </Text>
                    <Text style={[styles.text, { fontWeight: "normal" }]}>
                      Gender: {item.gender}
                    </Text>
                    <Text style={[styles.text, { fontWeight: "normal" }]}>
                      Last known location: {item.status}
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => alert("favorilere eklendi")}
                  >
                    <HeartIcon color={"black"} />
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View style={styles.refreshContainer}>
                <Text style={styles.refreshText}>Pull Up to Refresh</Text>
              </View>
            );
          }}
          onEndReachedThreshold={0}
          onEndReached={() => this.getCharacters(this.state.currentPage + 1)}
        />
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
  image: { width: 100, height: 100 },
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

export default CharactersScreen;
*/
