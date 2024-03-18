/* 

import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const ios = Platform.OS == "ios";
export default function MoviesScreen() {
  return <View classname="flex-1 bg-neutral-800"></View>;
}

*/

import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { Component } from "react";
import axios from "axios";

const API = "https://rickandmortyapi.com/api/";
class MoviesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
    };
  }

  getEpisodes() {
    axios
      .get(`${API}episode`)
      .then((response) => {
        this.setState({
          characters: (response.data && response.data.results) || [],
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }
  componentDidMount() {
    this.getEpisodes();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Episodes</Text>
        <FlatList
          data={this.state.episodes}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.row}>
                {" "}
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contaier: {
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
});

export default MoviesScreen;
