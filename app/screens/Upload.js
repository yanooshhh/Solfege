import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
  ImageBackground,
  Alert
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function UploadScreen({ route, navigation }) {
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [galleryPermission, setGalleryPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const statusCamera = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(statusCamera.granted);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const statusGallery = await ImagePicker.requestCameraRollPermissionsAsync();
      setGalleryPermission(statusGallery.granted)
    })();
  }, []);

  const pickImage = async () => {
    if(galleryPermission===false){
      Alert.alert(
        "Permission denied",
        "To choose photos from your library, go to the privacy settings and allow the access to the library",
        [{text:"Got it!"}]
      )
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takeImage = async () => {
    if(cameraPermission===false){
      Alert.alert(
        "Permission denied",
        "To take photos, go to the privacy settings and allow the access to the camera",
        [{text:"Got it!"}]
      )
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8
    });

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
   
      <View style={styles.box}>
        {image !== null &&(
          <View>
            <Image source={{ uri: image }} style={styles.image} resizeMode="contain"/>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button
                  color="#de5b5b"
                  title="Reset"
                  onPress={() => setImage(null)}
                />
              </View>
              <View style={styles.button}>
                <Button
                  color="#de5b5b"
                  title="Next"
                  onPress={() => navigation.navigate("Settings", { imageUri: image})}
                />
              </View>
            </View>
          </View>
        )}

        {image === null && (
          <View>
            <Image source={require("../assets/tip.jpg")} style={styles.tip} resizeMode="contain"/>
            <View style={styles.button}>
              <Button 
                color="#de5b5b" a
                title="Take a photo" 
                onPress={takeImage} 
              />
            </View>
            <View style={styles.button}>
              <Button
                color="#de5b5b"
                title="Choose from gallery"
                onPress={pickImage}
              />
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
    justifyContent: "flex-end",
    alignItems:"center", 
  },
  image: {
    //width:"100%",
    //height:100,

    borderWidth: 5,
    borderColor: "white",
    borderRadius: 5,
    margin:30,
    marginBottom: 200,
    alignSelf:"center"
  },
  tip:{

    height:300,
    opacity: 0.8,
    marginBottom: 110,
    alignSelf:"center"
  },

  box:{
    width:"80%",
    marginBottom: 20,
  },
  button: {
    paddingBottom: 20,
  },
});
