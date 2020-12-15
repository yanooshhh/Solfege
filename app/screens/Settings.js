import React, { useState, useEffect } from "react";
import {StyleSheet, ImageBackground, View, Text, Button, Image} from "react-native";
import {Picker} from '@react-native-picker/picker';

export default function SettingsScreen({ route, navigation }) {


    const [key, setKey] = useState("0");
    const [tempo, setTempo] = useState("2");
    const [clef, setClef] = useState("1");

    return(
        <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
        blurRadius={20}
        >
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <View style={styles.box}>
                <View style={styles.buttons} >
                    <View>
                        <Text style={styles.text}>Key signature</Text>
                        <Picker 
                          selectedValue={key}
                          style={styles.picker}
                          onValueChange={(itemValue) => setKey(itemValue)
                        }>
                          <Picker.Item label="D♭ / b♭m      (5 flats)" value="-5" />
                          <Picker.Item label="A♭ / d♭m      (4 flats)" value="-4" />
                          <Picker.Item label="E♭ / a♭m      (3 flats)" value="-3" />
                          <Picker.Item label="B♭ / gm       (2 flats)" value="-2" />
                          <Picker.Item label="F / dm         (1 flat)" value="-1" />
                          <Picker.Item label="C / am" value="0" />
                          <Picker.Item label="G / em        (1 sharp)" value="1" />
                          <Picker.Item label="D / bm        (2 sharps)" value="2" />
                          <Picker.Item label="A / f♯m       (3 sharps)" value="3" />
                          <Picker.Item label="E / c♯m       (4 sharps)" value="4" />
                          <Picker.Item label="B / g♯m       (5 sharps)" value="5" />
                        </Picker>
                    </View>
                    <View>
                        <Text style={styles.text}>Tempo</Text>
                        <Picker
                            selectedValue={tempo}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                setTempo(itemValue)
                            }>
                            <Picker.Item label="Slow" value="1" />
                            <Picker.Item label="Moderate" value="2" />
                            <Picker.Item label="Fast" value="3" />

                        </Picker>
                    </View>
                    <View>
                        <Text style={styles.text}>Clef</Text>
                        <Picker
                            selectedValue={clef}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                setClef(itemValue)
                            }>
                            <Picker.Item label="Treble" value="1" />
                            <Picker.Item label="Bass" value="2" />

                        </Picker>
                    </View>
                </View>
            </View>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <Button
                  color="#de5b5b"
                  title="Next"
                  onPress={() => navigation.navigate("Play", {imageUri: route.params.imageUri, key: key, tempo: tempo, clef: clef})}
                />
              </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center'
  },
  buttons: {
      padding: 20,
      alignItems: "center",
      width: "100%"
  },
  
  picker: {
    backgroundColor: "#de5b5b",
    color: "#FFFFFF",
    height: 30,
    width: 170,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  button: {
    paddingBottom: 20,
    width:"90%"
  },
  text:{
      color: "#FFFFFF",
      fontSize: 20,
      alignSelf: "center",
      padding: 20
  },
  logo: {
    position: "absolute",
    top: 100,
    width: "50%",
    height: 80,
  },
  box:{
    width:"80%",
    marginBottom: 20,
  },
});