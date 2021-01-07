import React, { useState, useEffect, useReducer } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
  ImageBackground,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function UploadScreen({ route, navigation }) {
  useEffect(() => {
    (async () => {
      const accessCamera = await ImagePicker.requestCameraPermissionsAsync();
      const accessLibrary = await ImagePicker.requestCameraRollPermissionsAsync();
      if (!accessCamera.granted || !accessLibrary.granted) {
        Alert.alert(
          "Permission denied",
          "Please give permission to access both the photo library and the camera.",
          [{ text: "Got it!" }]
        );
        navigation.goBack();
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.cancelled) {
      navigation.navigate("Uploaded", { image: result });
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.cancelled) {
      navigation.navigate("Uploaded", { image: result });
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
      blurRadius={3}
    >
      <View style={styles.box}>
        <Image
          source={require("../assets/tip.jpg")}
          style={styles.tip}
          resizeMode="contain"
        />
        <View style={styles.button}>
          <Button color="#de5b5b" a title="Take a photo" onPress={takeImage} />
        </View>
        <View style={styles.button}>
          <Button
            color="#de5b5b"
            title="Choose from gallery"
            onPress={pickImage}
          />
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
    aspectRatio: global.ratio,
    margin: 30,
    marginBottom: 200,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  tip: {
    height: 300,
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
