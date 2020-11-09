import React, { useState, useEffect } from "react";
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
import {Audio} from "expo-av";



function PlayScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  console.log(isPlaying);

  const soundObject = new Audio.Sound();
  
  useEffect(()=>{ 
    (async() => {
      await soundObject.loadAsync(require("../assets/vlog_intro.mp3"));
  })()},[]);


  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
      blurRadius={30}
    >
      <View style={styles.button}>
        {isPlaying ? (
          <Button
            title="Pause"
            color="#de5b5b"
            onPress={() => {
              async() => soundObject.stopAsync();
              setIsPlaying(false);
            }}
          />
        ) : (
          <Button
            title="Play"
            color="#de5b5b"
            onPress={() => 
              {
                soundObject.playAsync()
                
                setIsPlaying(true);
              }}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    backgroundColor: "#00000000",
    marginTop: 20,
    height: 50,

    width: "100%",
    justifyContent: "center",
  },
});

export default PlayScreen;
