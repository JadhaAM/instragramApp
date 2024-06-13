import React from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Formik } from 'formik';
import * as Yup from 'yup';

const apiUrl = process.env.EXPO_PUBLIC_SERVER_URL ;

const SignUp = () => {
  const navigation = useNavigation();

  const signUpValidationSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, {
        name: String(values.name),
        username: String(values.username),
        email: String(values.email),
        password: String(values.password),
      });

      if (response.status === 200) {
        Alert.alert("Registration successful", "You have been registered successfully");
        handleNavigation();
      } else {
        Alert.alert("Registration failed", "An error occurred while registering");
      }
    } catch (error) {
      console.log("Registration failed", error);
      Alert.alert("Registration failed", "An error occurred while registering");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNavigation = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <Formik
          initialValues={{ name: '', email: '', username: '', password: '' }}
          validationSchema={signUpValidationSchema}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons style={styles.icon} name="person" size={24} color="gray" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <View style={styles.inputContainer}>
                <AntDesign style={styles.icon} name="user" size={24} color="gray" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
              </View>
              {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

              <View style={styles.inputContainer}>
                <MaterialIcons style={styles.icon} name="email" size={24} color="gray" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
              </View>
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <View style={styles.inputContainer}>
                <AntDesign style={styles.icon} name="lock1" size={24} color="gray" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry
                  value={values.password}
                />
              </View>
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <Text style={styles.signInText}>
          Already have an account? <Text onPress={handleNavigation} style={styles.signInLink}>Log In</Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17202A',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
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
    backgroundColor: '#4285F4',
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
  signInText: {
    color: '#FDFEFE',
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontWeight: '500',
    fontSize: 19,
  },
  signInLink: {
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
