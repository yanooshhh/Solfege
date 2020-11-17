import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import HomeScreen from "./app/screens/Home";
import UploadScreen from "./app/screens/Upload";
import PlayScreen from "./app/screens/Play";
import SettingsScreen from "./app/screens/Settings";
//import Hamplet from "./app/screens/Hamlet";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Audio } from "expo-av";

const Stack = createStackNavigator();

function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Play" component={PlayScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        {/* <Stack.Screen name="Hamplet" compontnt={Hamplet} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
