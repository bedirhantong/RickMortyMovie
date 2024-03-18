import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { Component } from "react";
import axios from "axios";

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
          data={this.state.characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
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
                    {item.species}
                  </Text>
                  <Text style={[styles.text, { fontWeight: "normal" }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
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
