import React, { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { AuthContext } from '../../src/AuthContext';
import { api } from "../../src/api";

const LoginScreen = () => {
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);

    const loginValidationSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    const handleLogin = async (values, { setSubmitting }) => {
        const user = {
            
            email: values.email,
            password: values.password,
        };

        try {
            const response = await axios.post(`${api}/login`, user);

            if (response.status === 200) {
                console.log('Login successful');
                await login(values); // update user context
                navigation.navigate('HomeScreen');
            } else {
                console.error('Login failed:', response.statusText);
                Alert.alert('Login failed', 'Please check your credentials');
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            Alert.alert('Error', 'An unexpected error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleNavigation = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/logo.png')}
                />
            </View>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <AntDesign style={styles.icon} name="user" size={24} color="gray" />
                            <TextInput
                                style={styles.input}
                                placeholder="User name"
                                onChangeText={handleChange('userName')}
                                onBlur={handleBlur('userName')}
                                value={values.userName}
                            />
                        </View>
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <View style={styles.inputContainer}>
                            <AntDesign style={styles.icon} name="lock1" size={24} color="gray" />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                            />
                        </View>
                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>

            <Text style={styles.signUpText}>
                Don't have an account? <Text onPress={handleNavigation} style={styles.signUpLink}>Sign Up</Text>
            </Text>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#17202A',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    logo: {
        width: 150,
        height: 100,
        resizeMode: 'contain',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
    },
    icon: {
        marginLeft: 8,
    },
    input: {
        color: 'gray',
        marginVertical: 10,
        width: 300,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#0055ff',
        paddingHorizontal: 110,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 25,
    },
    buttonText: {
        fontWeight: '300',
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
    },
    signUpText: {
        color: '#FDFEFE',
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontWeight: '500',
        fontSize: 19,
    },
    signUpLink: {
        color: '#FDFEFE',
        fontWeight: 'bold',
        fontSize: 22,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
});
