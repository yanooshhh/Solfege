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
  Alert,
} from "react-native";
import {Audio} from "expo-av";

export default class PlayScreen extends Component{
  constructor(props) {
    super(props);

    this.state={
      imageUri: props.route.params.imageUri,
      key: props.route.params.key,
      tempo: props.route.params.tempo,
      clef: props.route.params.clef,
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
      let data = new FormData();
      data.append("image",{
        uri: this.state.imageUri,
        type: 'image/jpeg',
        name:'img'
      });
      data.append("key", this.state.key);
      data.append("tempo", this.state.tempo);
      data.append("clef", this.state.clef);

      try{
        let response = await fetch(server+"/predict_uri",{
          method: 'POST',
          body: data,
        });
        if (response.ok===false){
          Alert.alert(
            "Error",
            await response.text(),
            [{text:"Got it!"}]);
          return "";
        }
        return server + (await response.json());

      }catch(error){
        console.error(error);
      }
    }

    this.sound.loadAsync({uri: await getUri()}, status, true);
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

    return(
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
        blurRadius={30}
      >
      <Image source={{ uri: this.state.imageUri }} style={styles.image} resizeMode="contain"/>
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
  image: {
    width:"100%",
    height:100,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 5,
    margin:30,
    marginBottom: 200,
    alignSelf:"center"
  },
});

