import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Scanner from "./components/Scanner";
import List from "./components/List";

function HomeScreen() {
  return <Scanner />;
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <List />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Scanner" component={HomeScreen} />
        <Tab.Screen name="Promos" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
