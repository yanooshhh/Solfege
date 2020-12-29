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
import {BarIndicator, MaterialIndicator} from 'react-native-indicators';

export default class PlayScreen extends Component{

  constructor(props) {
    super(props);

    this.state={
      imageUri: props.route.params.imageUri,
      key: props.route.params.key,
      tempo: props.route.params.tempo,
      clef: props.route.params.clef,
      loaded: false,
      isPlaying:false,
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
        let response = await fetch(global.serverAddress+"/predict_uri",{
          method: 'POST',
          body: data,
        });
        if (response.ok===false){
          Alert.alert(
            "Server Error",
            "Please try again. If this error keeps on appearing, contact the administrators.",
            [{text:"Got it!"}]);
            console.log(await response.text())
          return "";
        }
        return global.serverAddress + (await response.json());

      }catch(error){
        console.error(error);
      }
    }

    await this.sound.loadAsync({uri: await getUri()}, status, false);
    this.state.loaded=true;
    this.forceUpdate();
  }

  async playSound() {
    this.sound.playAsync();
    this.state.isPlaying=true;
    this.forceUpdate();
  };

  async stopSound(){
    this.sound.stopAsync();
    this.state.isPlaying=false;
    this.forceUpdate();
  }

  async stopAndPop(){
    this.sound.stopAsync();
    this.state.isPlaying=false;
    this.props.navigation.popToTop();
  }

  render(){
    return(
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
        blurRadius={30}
      >

      <View style={styles.box}>
      <Image source={{ uri: this.state.imageUri }} style={styles.image} resizeMode="contain"/>
        {this.state.loaded===false &&(
          <View style={styles.indicator}>
            <MaterialIndicator color="#de5b5b"/>
          </View>
        )}
          {this.state.isPlaying===true &&(
            <BarIndicator count={5} color="#de5b5b"/>
          )}
        <View style={styles.buttons}>
          

          {this.state.loaded===true && this.state.isPlaying===false &&(            
            <View style={styles.button}>
                <Button
                  color="#de5b5b"
                  title="Play"
                  onPress={this.playSound.bind(this)}
                />
            </View>
          )}
          {this.state.loaded===true && this.state.isPlaying===true &&(            
            <View style={styles.button}>
              <Button
                color="#de5b5b"
                title="Stop"
                onPress={this.stopSound.bind(this)}
              />
            </View>
          )}

          <View style={styles.button}>
            <Button
              color="#de5b5b"
              title="Upload a new photo"
              onPress={this.stopAndPop.bind(this)}/>

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
    top:50,
    width:"100%",
    height:100,
    borderWidth: 5,
    borderColor: "white",
    borderRadius: 5,
    margin:30,
    marginBottom: 100,
    alignSelf:"center"
  },
  indicator:{
    margin: 20,
  }
});

