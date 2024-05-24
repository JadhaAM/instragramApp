import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import axios from 'axios';


const apiUrl = process.env.EXPO_PUBLIC_SERVER_URL;

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigation = useNavigation();

    const handleLogin = async () => {
        const user = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post(`${apiUrl}/login`, user);

            if (response.status === 200) {
                console.log('Login successful');
                navigation.navigate('HomeScreen');
            } else {
                console.error('Login failed:', response.statusText);
                if (response.status === 401) {

                } else {
                    console.error('Unexpected error:', response.data.message);
                }
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
        }
    };

    const handleNavigation = () => {
        navigation.navigate('signUp');
    };
    const handleLoginNav = () => {
        navigation.navigate('ProfileScreen');
    };
    return (



        <View
            style={{
                flex: 1,
                backgroundColor: '#17202A',
                color: '#FDFEFE',
                padding: '20',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                paddingHorizontal: 4
            }}>
                <Image style={{ width: 150, height: 100, resizeMode: "contain"  }}
                    source={
                        require('../../assets/images/logo.png')
                       
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
                        <AntDesign
                            style={{ marginLeft: 8 }}
                            name="user"
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
                            placeholder="user name"
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
                        backgroundColor: '#0055ff',
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

                        }}
                        onPress={handleLogin}
                        >Log In</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{
                    color: '#FDFEFE',
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    fontWeight: 500,
                    fontSize: 19
                }} >Don't have an account? <Text onPress={handleNavigation} style={{ color: '#FDFEFE', fontWeight: 'bold', fontSize: 22 }}>Sign Up</Text></Text>
            </View>
        </View>

    );
};

export default LoginScreen;

const styles = StyleSheet.create({});
