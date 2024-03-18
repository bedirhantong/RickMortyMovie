import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/WelcomeScreen";
import MoviesScreen from "../screens/MoviesScreen";
import CharactersScreen from "../screens/CharactersScreen";
import SavedCharactersScreen from "../screens/SavedCharactersScreen";
import { Ionicons } from "@expo/vector-icons";

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
