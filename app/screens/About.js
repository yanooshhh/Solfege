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
  TextInput,
  KeyboardAvoidingView
} from "react-native";

function AboutScreen({ navigation }) {
    //const [address, setAddress] = useState('http://solfege.northeurope.cloudapp.azure.com');
    return (
        
        <ImageBackground
            style={styles.background}
            source={require("../assets/background.jpg")}
            blurRadius={20}
        >
            {/* <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={50}> */}
            <View>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <View style={styles.box}>
                <Text style={styles.text1}>Address of the server</Text>
                
                <TextInput 
                    style={styles.textInput} 
                    textContentType="URL" 
                    onChangeText={text=>
                    {
                        if(text.endsWith("/")){
                            global.serverAddress=text.substr(0, text.length-1);
                        }
                        else{
                            global.serverAddress=text;
                        }
                    }}
                    defaultValue={global.serverAddress}/>
                
                <Text style={styles.text2}>
                    This application has been created by the team of: Janusz Jagiello, 
                    Franciszek Lukasiewicz and Filip Szymczak. It is a client for our OMR server.
                    The whole system is the project for our bachelor thesis at Faculty of 
                    Mathematics and Informations Science, Warsaw University of Technology.
                    {"\n\n"}Some legal facts
                    {"\n\n"}Warsaw, January 2021
                </Text>
                <View style={styles.buttons}>
                    <Button
                        color="#de5b5b"
                        title="Go back"
                        onPress={()=>navigation.goBack()}
                    />
                </View>
            </View>
            </View>
            {/* </KeyboardAvoidingView> */}
        </ImageBackground>
        
    );
}
    
const styles = StyleSheet.create({
    background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    },

    box:{
        width:"80%",
        marginBottom: 20,
      },

    text1:{
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        alignSelf: "baseline",
        marginBottom:20,
        marginTop:260
    },

    text2:{
        color: "white",
        fontSize: 15,
        alignSelf: "center",
        paddingBottom:100
    },


    textInput:{
        width: "100%",
        borderColor: 'white',
        borderWidth:2,
        padding:5,
        color:"white",
        marginBottom:20,
        backgroundColor:"#ffffff50",
        
        
        
    },

    logo: {
    position: "absolute",
    top: -180,
    width: "80%",
    height: 110,
    },

    buttons: {
    height: 90,
    backgroundColor: "#00000000",
    justifyContent: "center",

    },

});

export default AboutScreen;
