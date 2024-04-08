//Archivo no utilizado

import React  from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../api/firebase-config';

export default function LoginScreen() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    let byPassAccount = false;
  
    const handleCreateAccount= () => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentil) =>{
        console.log("Cuenta creada con exito!")
        const user = userCredentil.user;
        console.log(user)
        Alert.alert("Cuenta creada con exito! Bienvenido ", email)
        navigation.navigate('MyTabs');
      })
      .catch(error =>{
        console.log(error)
        Alert.alert(error.message)
      })
    }
  
    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredentil) =>{
        console.log("Logeado!")
        const user = userCredentil.user;
        console.log(user)
        Alert.alert("Bienvenido! ", email)
        navigation.navigate('Home');
      })
      .catch(error =>{
        console.log(error)
        Alert.alert(error.message)
      })
    }
  
    //const LogIn = () =>{
    //  setAccountLogged(true);
    //  navigation.navigate('MyTabs'); // Navega a MyTabs en lugar de HomeScreen
    //}

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Video
          source={require('../assets/login.mp4')}
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
          shouldPlay
          isLooping
          resizeMode="cover"
        />
              <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
        >
        <View style={{ flex: 1, justifyContent: 'space-around', backgroundColor: 'transparent' }}>
          <View style={{ alignItems: 'center' }}>
          <Text style={styles.text}>
              CUENTA
            </Text>
        </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <TextInput className="bg-blue-800"
        style={{
            padding: 10,
            borderRadius: 10,
            color: 'white',
            width: '80%',
            alignSelf: 'center',
            fontFamily:'DMSansMedium'
        }}
        onChangeText={setEmail}
        value={email}
        placeholder="Correo Electronico"
        placeholderTextColor="white"
        />

        <Text></Text>

        <TextInput className="bg-blue-800"
        style={{
            padding: 10,
            borderRadius: 10,
            color: 'white',
            width: '80%',
            alignSelf: 'center',
            fontFamily:'DMSansMedium'
        }}
        onChangeText={setPassword}
        value={password}
        placeholder="Contraseña"
        placeholderTextColor="white"
        secureTextEntry
        />
        
        <View style={{ flexDirection: 'row', marginTop: 20 }}>

    <TouchableOpacity 
      style={{
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
        marginRight: 10,
      }}
      onPress={handleSignIn}
    >
      <Text style={{ color: 'white', fontFamily:'DMSansBold' }}>Iniciar Sesion</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      style={{
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
        fontFamily:'DMSansMedium'
      }}
      onPress={handleCreateAccount}
    >
      <Text style={{ color: 'white', fontFamily:'DMSansBold' }}>Crear cuenta</Text>
    </TouchableOpacity>
  </View>
        

        </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
      fontFamily: 'AlienRobot',
      fontSize: 28,
      marginTop: 20,
      color: '#FCFCFC',
    },
    subtext: {
      fontFamily: 'AlienRobot',
      fontSize: 10,
      marginTop: 10,
      color: '#FCFCFC',
    },
    buttontext: {
      fontFamily: 'AlienRobot',
      fontSize: 10,
      color: '#FCFCFC',
    },
  });