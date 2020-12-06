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
  constructor(props) {
    super(props);

    this.state={
      fileuri: null,
    }
  }

  async componentDidMount(){
    Audio.setAudioModeAsync({
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true
    });

    this.sound = new Audio.Sound();

    const status = {
      shouldPlay: false,
      volume: 1.0,
      isLooping: true
    };
  

    const server = 'http://solfege.northeurope.cloudapp.azure.com';

    const getUri = async() =>{
      try{
        let response = await fetch(server+"/geturi");
        return server + (await response.text());
      }catch(error){
        console.error(error);
      }
    }
    this.sound.loadAsync({uri: await getUri()}, status, false);
  }

  async playSound() {
    this.sound.playAsync();
    let status = await this.sound.getStatusAsync();
    console.log(status);
  };

  async stopSound(){
    this.sound.stopAsync();
    let status = await this.sound.getStatusAsync();
    console.log(status);
  }


  render(){
    const {imageUri, key, tempo, clef} = this.props.route.params;
    return(
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
        blurRadius={30}
      >
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain"/>
      <View style={styles.box}>
        
        <View>
          
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                color="#de5b5b"
                title="Play"
                onPress={this.playSound.bind(this)}
              />
            </View>
            <View style={styles.button}>
              <Button
                color="#de5b5b"
                title="Stop"
                onPress={this.stopSound.bind(this)}
              />
            </View>
            <View style={styles.button}>
              <Button
                color="#de5b5b"
                title="Upload a new photo"
                onPress={()=>{
                  this.stopSound.bind(this);
                  this.props.navigation.popToTop();
                }}
              />

            </View>
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
  buttons: {
    padding: 20,
    alignItems: "center",
    width: "100%"
  },
  box:{
    width:"80%",
    marginBottom: 20,
  },
});

