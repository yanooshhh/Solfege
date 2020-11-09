import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  ImageBackground,
  Image,
  Platform,
} from "react-native";

function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.start}>
        <Button
          title="Start"
          color="#de5b5b"
          onPress={() => navigation.navigate("Upload")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  logo: {
    position: "absolute",
    top: 80,
    width: "80%",
    height: 110,
  },
  start: {
    width: "80%",
    height: 60,
    backgroundColor: "#00000000",
    justifyContent: "center",
    marginBottom: 30,
  },
});

export default HomeScreen;
