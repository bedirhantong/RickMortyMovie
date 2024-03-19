import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";

const windowWidth = Dimensions.get("window").width;
const itemWidth = (windowWidth - 20) / 2;

const seasons = [
  {
    id: 1,
    episodeLength: "1,2,3,4,5,6,7,8,9,10,11",
    name: "Season 1",
    image: require("../../assets/images/season1.png"),
    description: "A strangely eccentric genius scientist and inventor ...",
  },
  {
    id: 2,
    episodeLength: "12,13,14,15,16,17,18,19,20,21",
    name: "Season 2",
    image: require("../../assets/images/season2.png"),
    description: "The Smith family is invited to the wedding of ...",
  },
  {
    id: 3,
    episodeLength: "22,23,24,25,26,27,28,29,30,31",
    name: "Season 3",
    image: require("../../assets/images/season3.png"),
    description:
      "Following a stressful adventure, Rick and Morty go on a break ...",
  },
  {
    id: 4,
    episodeLength: "32,33,34,35,36,37,38,39,40,41",
    name: "Season 4",
    image: require("../../assets/images/season4.jpg"),
    description:
      "Morty discovers a race of intelligent space snakes after suffering ...",
  },
  {
    id: 5,
    episodeLength: "42,43,44,45,46,47,48,49,50,51",
    name: "Season 5",
    image: require("../../assets/images/season5.jpg"),
    description:
      "Rick is living his best anime life. Meanwhile in the Citadel of Ricks...",
  },
];

const MoviesScreen = () => {
  const navigation = useNavigation();

  const handleSeasonPress = (episodeLength) => {
    navigation.navigate("SeasonEpisodesScreen", { episodeLength });
  };

  return (
    <View style={styles.container}>
      <View className="flex-row space-x-4">
        <BellIcon size={30} strokeWidth={2} color="black" />
        <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
          <MagnifyingGlassIcon size={30} strokeWidth={2} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={seasons}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSeasonPress(item.episodeLength)}
          >
            <View style={[styles.seasonContainer, { width: itemWidth }]}>
              <Image source={item.image} style={styles.seasonImage} />
              <Text style={styles.seasonName}>{item.name}</Text>
              <Text style={styles.seasonDesc}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  seasonContainer: {
    margin: 5,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#97ce4c",
  },
  seasonImage: {
    width: itemWidth,
    height: itemWidth,
    resizeMode: "contain",
    borderRadius: 2,
    marginVertical: 5,
  },
  seasonName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  seasonDesc: {
    fontSize: 14,
    fontWeight: "normal",
    textAlign: "center",
    marginBottom: 10,
    marginHorizontal: 10,
  },
});

export default MoviesScreen;
