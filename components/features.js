import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Features() {
  return (
        <View style={{height: hp(70)}} className="space-y-4">
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.text}>
                Features
            </Text>
          </View>

          <View style={{margin: 10}} className="bg-blue-800 p-4 rounded-xl space-y-2">
            <View className="flex-row items-center space-x-2">
              <Image source={require('../assets/icons/ChatGPT-icon.png')} style={{height: hp(4), width: hp(4)}} />
                <Text style={styles.SubText}>
                  ChatGPT 3.5 Turbo
                </Text>
            </View>
            <Text style={styles.ContentText}>
            ChatGPT es un modelo de inteligencia artificial de OpenAI que genera respuestas coherentes y contextuales a partir del texto ingresado por los usuarios.
            </Text>
          </View>

          <View style={{margin: 10}} className="bg-blue-800 p-4 rounded-xl space-y-2">
            <View className="flex-row items-center space-x-2">
              <Image source={require('../assets/icons/DallE-icon.png')} style={{height: hp(4), width: hp(4)}} />
                <Text style={styles.SubText}>
                  DALL-E 2
                </Text>
            </View>
            <Text style={styles.ContentText}>
            DALL-E, desarrollado por OpenAI, es un modelo de IA que genera imágenes a partir de descripciones textuales. 
            Utiliza técnicas de aprendizaje profundo para interpretar y visualizar conceptos, produciendo imágenes realistas y creativas.
            </Text>
          </View>

          <View style={{margin: 10}} className="bg-blue-800 p-4 rounded-xl space-y-2">
            <View className="flex-row items-center space-x-2">
              <Image source={require('../assets/icons/Aurora-icon.png')} style={{height: hp(4), width: hp(4)}} />
                <Text style={styles.SubText}>
                  Aurora AI
                </Text>
            </View>
            <Text style={styles.ContentText}>
            Aurora AI es una asistente de voz con habilidades de ChatGPT y DALL-E. Ofrece conversaciones coherentes y genera imágenes realistas a partir de descripciones textuales, proporcionando resultados óptimos en diversas tareas.
            </Text>
          </View>

        </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'AlienRobot',
    fontSize: 20,
    //marginTop: 5,
    color: '#FCFCFC',
  },
  SubText: {
    fontFamily: 'DMSansBold',
    fontSize: 14,
    color: '#FCFCFC',
  },
  ContentText: {
    fontFamily: 'DMSansBold',
    fontSize: 14,
    marginTop: 5,
    color: '#FCFCFC',
  },
  backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
  },
  roundedBlueBox: {
      backgroundColor: '#1C3373',
      padding: 4,
      borderRadius: 10,
      margin: 10,
  }
});
