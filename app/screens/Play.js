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
import { Audio } from "expo-av";
import { BarIndicator, MaterialIndicator } from "react-native-indicators";

export default class PlayScreen extends Component {
  constructor(props) {
    super(props);
    this.params = {
      image: props.route.params.image,
      key: props.route.params.key,
      tempo: props.route.params.tempo,
      clef: props.route.params.clef,
    };
    this.state = {
      loaded: false,
      isPlaying: false,
    };

    this.controller = new AbortController();
  }

  async componentDidMount() {
    Audio.setAudioModeAsync({
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true,
    });

    this.sound = new Audio.Sound();

    const status = {
      shouldPlay: false,
      volume: 1.0,
      isLooping: true,
    };

    const getUri = async () => {
      let data = new FormData();
      data.append("image", {
        uri: this.params.image.uri,
        type: "image/jpeg",
        name: "img",
      });
      data.append("key", this.params.key);
      data.append("tempo", this.params.tempo);
      data.append("clef", this.params.clef);

      try {
        let response = await fetch(global.serverAddress + "/predict_uri", {
          method: "POST",
          body: data,
          signal: this.controller.signal,
        });
        if (response.ok === false) {
          Alert.alert(
            "Server Error",
            "Please try again. If this error keeps on appearing, contact the administrators.",
            [{ text: "Got it!" }]
          );
          console.log(await response.text());
          return "";
        }
        return global.serverAddress + (await response.json());
      } catch (error) {}
    };
    try {
      const uri = await getUri();
      await this.sound.loadAsync({ uri: uri }, status, false);
    } catch (error) {}
    this.state.loaded = true;
    this.forceUpdate();
  }

  async componentWillUnmount() {
    this.controller.abort();
    if (this.state.isPlaying) {
      this.sound.stopAsync();
    }
  }

  async playSound() {
    this.sound.playAsync();
    this.state.isPlaying = true;
    this.forceUpdate();
  }

  async stopSound() {
    this.sound.stopAsync();
    this.state.isPlaying = false;
    this.forceUpdate();
  }

  render() {
    return (
      <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
        blurRadius={3}
      >
        <View style={styles.box}>
          <Image
            source={{ uri: this.params.image.uri }}
            style={styles.image}
            aspectRatio={Math.max(
              this.params.image.width / this.params.image.height,
              1.5
            )}
          />
          {this.state.loaded === false && (
            <View style={styles.indicatorLoading}>
              <MaterialIndicator color="#de5b5b" />
            </View>
          )}
          {this.state.isPlaying === true && (
            <View style={styles.indicatorPlaying}>
              <BarIndicator count={5} color="#de5b5b" />
            </View>
          )}
          <View>
            {this.state.loaded === true && this.state.isPlaying === false && (
              <View style={styles.button}>
                <Button
                  color="#de5b5b"
                  title="Play"
                  onPress={this.playSound.bind(this)}
                />
              </View>
            )}
            {this.state.loaded === true && this.state.isPlaying === true && (
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
                onPress={() => this.props.navigation.navigate("Upload")}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#00000000",
    marginTop: 10,
    height: 50,

    width: "100%",
    justifyContent: "center",
  },
  box: {
    width: "80%",
    marginBottom: 30,
  },
  image: {
    bottom: 200,
    position: "absolute",
    width: "100%",
    margin: 30,
    marginBottom: 120,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  indicatorLoading: {
    marginBottom: 120,
  },
  indicatorPlaying: {
    marginBottom: 90,
  },
});
