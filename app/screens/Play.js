import React, { useState, useEffect, Component } from "react";
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

export default class PlayScreen extends Component{
  async componentDidMount(){
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true
    });

    this.sound = new Audio.Sound();

    const status = {
      shouldPlay: false,
      volume: 1.0
    };

    this.sound.loadAsync({uri:'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3'}, status, false);
  }

  playSound() {
    this.sound.playAsync();
  };

  stopSound(){
    this.sound.stopAsync()
  }


  render(){
    return(
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
        blurRadius={30}
      >
        <View>
            <View style={styles.buttons}>
              <View style={styles.button}>
                  <Button
                    color="#de5b5b"
                    title="Pause"
                    onPress={this.stopSound.bind(this)}
                  />
                  <Button 
                    color="#de5b5b" 
                    title="Play" 
                    onPress={this.playSound.bind(this)}
                  />
                </View>
            </View>
        </View>
      </ImageBackground>
    )
  }
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

