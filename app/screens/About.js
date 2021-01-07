import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  ImageBackground,
  Image,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

export default function AboutScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      imageStyle={styles.backgroundphoto}
      source={require("../assets/background.jpg")}
      blurRadius={3}
    >
      <View>
        <View style={styles.box}>
          <Text style={styles.text1}>Address of the server</Text>

          <TextInput
            style={styles.textInput}
            textContentType="URL"
            onChangeText={(text) => {
              if (text.endsWith("/")) {
                global.serverAddress = text.substr(0, text.length - 1);
              } else {
                global.serverAddress = text;
              }
            }}
            defaultValue={global.serverAddress}
          />

          <Text style={styles.text2}>
            This application has been created by the team of Janusz Jagiello,
            Franciszek Lukasiewicz and Filip Szymczak. It serves as a client to
            our OMR server. The whole system is a part of our bachelor thesis
            projectat Faculty of Mathematics and Informations Science, Warsaw
            University of Technology.
            {"\n\n"}Warsaw, January 2021
          </Text>
          <View style={styles.buttons}>
            <Button
              color="#de5b5b"
              title="Go back"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    top: 0,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backgroundphoto: {
    resizeMode: "cover",
  },
  box: {
    width: "80%",
    marginBottom: 180,
  },
  text1: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "baseline",
    marginBottom: 10,
    marginTop: 300,
  },
  text2: {
    color: "white",
    fontSize: 15,
    alignSelf: "center",
    textAlign: "justify",
  },
  textInput: {
    borderColor: "white",
    borderWidth: 2,
    padding: 5,
    color: "white",
    marginBottom: 30,
    backgroundColor: "#ffffff50",
  },
  buttons: {
    height: 90,
    backgroundColor: "#00000000",
    justifyContent: "center",
  },
});
