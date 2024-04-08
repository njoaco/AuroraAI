import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Video
        source={require('../assets/Background_compress2.mp4')}
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        shouldPlay
        isLooping
        resizeMode="cover"
      />
      <View style={{ flex: 1, justifyContent: 'space-around', backgroundColor: 'transparent' }}>
        <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>
            Aurora
          </Text>
          <Text style={styles.subtext}>
            AI Assistant v1.0
          </Text>
          <Text></Text>
        </View>
        <View style={{ alignItems: 'center' }}>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate('Home')} style={{ backgroundColor: '#3066AB', margin: 20, padding: 15, borderRadius: 50, alignItems: 'center' }}>
          <Text style={styles.buttontext}>Empezar</Text>
        </TouchableOpacity>
      </View>
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
