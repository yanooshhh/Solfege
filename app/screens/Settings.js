import React, { useState, useEffect } from "react";
import {StyleSheet, ImageBackground, View, Text} from "react-native";

export default function SettingsScreen({ navigation }) {

    const wheelPickerData =[
        "F major",
        "C major",
        "G major"
    ];

    return(
        <ImageBackground
        style={styles.background}
        source={require("../assets/background.jpg")}
        blurRadius={30}
        >
            <View>
                            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: "center",
    }
});