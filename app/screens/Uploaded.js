import React from "react";
import { Button, Image, View, StyleSheet, ImageBackground } from "react-native";

export default function UploadedScreen({ route, navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
      blurRadius={3}
    >
      <View style={styles.box}>
        <Image
          source={{ uri: route.params.image.uri }}
          style={styles.image}
          aspectRatio={Math.max(
            route.params.image.width / route.params.image.height,
            1.5
          )}
        />
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
              color="#de5b5b"
              title="Reset"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.button}>
            <Button
              color="#de5b5b"
              title="Next"
              onPress={() =>
                navigation.navigate("Settings", { image: route.params.image })
              }
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: "100%",
    margin: 30,
    marginBottom: 220,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  tip: {
    height: 300,
    opacity: 0.8,
    marginBottom: 110,
    alignSelf: "center",
  },
  border: {
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 5,
  },
  box: {
    width: "80%",
    marginBottom: 20,
  },
  button: {
    paddingBottom: 20,
  },
});
