import React, { useState, useEffect, useReducer} from "react";
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
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

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
      navigation.navigate("Uploaded", {image: result})
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
      navigation.navigate("Uploaded", {image: result})
    }

  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
      blurRadius={30}
    >
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.box}>
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
    width:"100%",
    aspectRatio: global.ratio,
    margin:30,
    marginBottom: 200,
    alignSelf:"center",
    borderWidth: 2,
    borderColor: "white",
  },
  tip:{
    height:300,
    opacity: 0.8,
    marginBottom: 90,
    alignSelf:"center"
  },
  border:{
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 5,
  },
  box:{
    width:"80%",
    marginBottom: 20,
  },
  button: {
    paddingBottom: 20,
  },
  logo: {
    position: "absolute",
    top: 80,
    width: "50%",
    height: 80,
  },
});
