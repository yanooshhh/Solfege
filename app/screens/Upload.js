import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default function UploadScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const statusGallery = await ImagePicker.requestCameraRollPermissionsAsync();
      const statusCamera = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(statusCamera.granted && statusGallery.granted);
    })();
  }, []);

  if (hasPermission === null) {
    return <Text style={{ alignContent: "center" }}>Dupa</Text>;
  }

  if (hasPermission === false) {
    return <Text>No camera or gallery access</Text>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
      blurRadius={30}
    >
      <View>
        {image !== null && (
          <View style={styles.imageLoaded}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button
                  color="#de5b5b"
                  style={styles.buttons}
                  title="Next"
                  onPress={() => navigation.navigate("Settings")}
                />
              </View>
            </View>
          </View>
        )}

        {image === null && (
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                color="#de5b5b"
                title="Choose from gallery"
                onPress={pickImage}
              />
            </View>
            <View style={styles.button}>
              <Button color="#de5b5b" title="Take a photo" onPress={takeImage} />
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: "90%",
    aspectRatio: 1,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 5,
    alignItems: "center",
  },
  buttons: {
    padding: 20,

    width: "100%",
  },
  button: {
    backgroundColor: "#00000000",
    marginTop: 20,
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  imageLoaded: {
    width: "100%",
    alignItems: "center",
  },
});
