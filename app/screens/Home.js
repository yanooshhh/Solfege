import React, { useEffect, useState} from "react";
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

function HomeScreen({ navigation }) {
  const [connection, setConnection] = useState(false);
  
  useEffect(()=>{
    fetch('http://solfege.northeurope.cloudapp.azure.com/ping')
    .then((response)=> setConnection(response.ok))
  })

  return (
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
            onPress={() =>{
              if(connection===true){
                console.log(connection);
                navigation.navigate("Upload");
              }
            }}
          />
        </View>
        <View style={styles.button}>
          <Button 
            title="About"
            color="#de5b5b"
            onPress={() => navigation.navigate("About")}
          />
        </View>
      </View>
    </ImageBackground>
  );
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

export default HomeScreen;
