import React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView,TextInput,TouchableOpacity, Alert} from 'react-native';
import * as firebase from "firebase";
export default class Loginscreen extends React.Component {
    constructor(){
        super(),
        this.state={emailid:"",password:""}

    }
    Login=async(emailid,password)=>{
        if(emailid && password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(emailid,password)
                if(response){
                    this.props.navigation.navigate("Transactionscreen")
                }
            }
            catch(error){
                switch(error.code){
                    case "auth/user-not-found":
                        Alert.alert("User Doesn't Exist")
                        break
                    case "auth/invalid-email":
                        Alert.alert("Incorrect email or password")
                        break   
                }
            }
        }
        else {
            Alert.alert("Enter Email and Password")
        }
    }
  render(){

  
  return (
  <KeyboardAvoidingView style={{alignItems:"center",marginTop:20}}>
      <View>
          <Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}/>
          <Text style={{textAlign:'center',fontSize:20}}>Wireless Library</Text>
      </View>
      <View>
      <TextInput style={styles.loginbox}
      placeholder="abc@example.com"
      keyboardType="email-address"
      onChangeText={(text)=>{
          this.setState({emailid:text})
      }}/>
      <TextInput style={styles.loginbox}
      placeholder="Enter Password"
      secureTextEntry={true}
      onChangeText={(text)=>{
          this.setState({password:text})
      }}/>
      </View>
      <View><TouchableOpacity style={{width:100,height:70,backgroundColor:"blue",marginTop:10,borderRadius:10}} onPress={()=>{
          this.Login(this.state.emailid,this.state.password)
      }}>
          <Text>
              Login
              </Text></TouchableOpacity></View>
  </KeyboardAvoidingView>
    
  );
}
}
const styles=StyleSheet.create({
    loginbox:{
        width:250,height:60,borderWidth:2,fontSize:25,margin:15,
    }
})