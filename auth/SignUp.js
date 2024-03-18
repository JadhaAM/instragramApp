import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
const apiUrl = process.env.EXPO_PUBLIC_SERVER_URL


console.log(apiUrl);
const SignUp = () => {

  // handels the linkes
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
    
  const handleSignUp = () => {
    // Perform sign-up logic here, like sending data to the server
    console.log({ name, email, phoneNumber, companyName, otp });

    console.log("hello")
    const user = {
      name: name,
      email: email,
      password: password,
      username:userName,
    }

    axios.post(`${apiUrl}/register`, user).then((response) => {
      console.log(response);
      Alert.alert("Registration successful", "You have been registered successfully");
      setName("");
      setEmail("");
      setPassword("");
      setCompanyName("");

    }).catch((error) => {
      Alert.alert("Registration failed", "An error occurred while registering");
      console.log("registration failed", error)
    });
    navigation.navigate('LoginScreen');
  };

  const handleNavigation = () => {
    navigation.navigate('LoginScreen');
  };
  return (

    <View style={{
      flex: 1,
      backgroundColor: '#17202A',
      color: 'white',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
      }}>
         <Image style={{ width: 150, height: 100, resizeMode: "contain"  }}
                    source={
                        require('../assets/images/logo.png')
                   }
                />
        <View style={{ width: '100%' }}>
        <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <Ionicons
                style={{ marginLeft: 8 }}
                name="person"
                size={24}
                color="gray"
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 18 : 18,
                }}
                placeholder="enter your full name"
              />
            </View>
        <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="user"
              size={24}
              color="gray"
            />
            <TextInput
              value={userName}
              onChangeText={(text) => setUsername(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 18,
              }}
              placeholder="enter user name "
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 18,
              }}
              placeholder="enter your Email"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock1"
                size={24}
                color="gray"
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 18 : 18,
                }}
                placeholder="enter your Password"
              />
            </View>
          </View>
          
          <TouchableOpacity style={{
            backgroundColor: '#4285F4',
            paddingHorizontal: 110,
            paddingVertical: 15,
            borderRadius: 15,
            marginTop: 25,
          }}>
            <Text style={{
              fontWeight: 300,
              fontSize: 20,
              textAlign: 'center',
              color: '#ffffff',
            }}>SignUp</Text>
          </TouchableOpacity>
        </View>
        <Text style={{
          color: '#FDFEFE',
          paddingHorizontal: 10,
          paddingVertical: 20,
          fontWeight: 500,
          fontSize: 19
        }}>Already have an account ? <Text onPress={handleNavigation} style={{ color: '#FDFEFE', fontWeight: 'bold', fontSize: 22 }}>Log In</Text></Text>
      </View>
    </View>


  );
};

export default SignUp;
