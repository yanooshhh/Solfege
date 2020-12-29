import React, { useEffect, useState, Component} from "react";
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

export default class HomeScreen extends Component{
  constructor(props)
  {
    super(props);

    global.serverAddress='http://solfege.northeurope.cloudapp.azure.com';
  }

  async checkConnectionAndGoNext(){
    console.log(global.serverAddress);
    try{
      const controller = new AbortController();
      const timeout = setTimeout(()=>{
        controller.abort()
      }, 3000)

      const connection = await fetch(serverAddress+"/ping", {signal: controller.signal})
        .then((response)=> {return response.ok});

      if(connection){
        this.props.navigation.navigate("Upload");
      }
      else{
        this.showError();
      }
    }
    catch(error){
      this.showError();
      console.log(error);
    }
  }

  showError(){
    Alert.alert(
      "Cannot connect to the server",
      "Check your network connection and the server address in About. If it does not help, contact the app administrators.",
      [{text: "Got it!"}]);
  }

  render(){
    return(
      <ImageBackground
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button 
            title="Start"
            color="#de5b5b"
            onPress={() => {
              this.checkConnectionAndGoNext();
            }}
          />
        </View>
        <View style={styles.button}>
          <Button 
            title="About"
            color="#de5b5b"
            onPress={() => this.props.navigation.navigate("About")}
          />
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
    justifyContent: "flex-end",
  },

  logo: {
    position: "absolute",
    top: 80,
    width: "80%",
    height: 110,
  },
  buttons: {
    width: "80%",
    height: 90,
    backgroundColor: "#00000000",
    justifyContent: "center",
    marginBottom: 30,
  },
  button: {
    paddingBottom: 20,
  }
});


