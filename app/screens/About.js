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

function AboutScreen({ navigation }) {

    return (
        <ImageBackground
            style={styles.background}
            source={require("../assets/background.jpg")}
            blurRadius={20}
        >
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <Text style={styles.text}>
                This application has been created by the team of: Janusz Jagiello, 
                Franciszek Lukasiewicz and Filip Szymczak. It is a client for our OMR server.
                The whole system is the project for our bachelor thesis at Faculty of 
                Mathematics and Informations Science, Warsaw University of Technology.
                {"\n\n"}Some legal facts
                {"\n\n"}Warsaw, January 2021
            </Text>
            <View style={styles.buttons}>
                <View style={styles.button}>
                <Button
                  color="#de5b5b"
                  title="Go back"
                  onPress={()=>navigation.goBack()}
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

    text:{
        color: "#FFFFFF",
        fontSize: 15,
        alignSelf: "center",
        width: "80%"
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

export default AboutScreen;
