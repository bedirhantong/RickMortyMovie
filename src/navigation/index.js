import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/WelcomeScreen";
import MoviesScreen from "../screens/MoviesScreen";
import CharactersScreen from "../screens/CharactersScreen";
import SavedCharactersScreen from "../screens/SavedCharactersScreen";
import SearchScreen from "../screens/SearchScreen";
import PersonScreen from "../screens/PersonScreen";
import EpisodeDetailScreen from "../screens/EpisodeDetailScreen";
import { Ionicons } from "@expo/vector-icons";
import SeasonEpisodesScreen from "../screens/SeasonEpisodes";
import CharacterDetailScreen from "../screens/CharacterDetailScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  function HomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="PersonScreen" component={PersonScreen} />
        <Stack.Screen
          name="CharacterDetailScreen"
          component={CharacterDetailScreen}
        />
        <Stack.Screen
          name="SeasonEpisodesScreen"
          component={SeasonEpisodesScreen}
        />

        <Stack.Screen
          name="EpisodeDetailScreen"
          component={EpisodeDetailScreen}
        />
      </Stack.Navigator>
    );
  }

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Episodes") {
              iconName = "home";
            } else if (route.name === "Characters") {
              iconName = "person";
            } else if (route.name === "SavedCharacters") {
              iconName = "heart";
            }

            const customizeSize = 20;

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "white" : "gray"}
              />
            );
          },
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "black",
            borderTopWidth: 0,
            paddingBottom: 5,
            paddingTop: 5,
          },
        })}
      >
        <Tab.Screen name="Episodes" component={MoviesScreen} />
        <Tab.Screen name="Characters" component={CharactersScreen} />
        <Tab.Screen name="SavedCharacters" component={SavedCharactersScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
