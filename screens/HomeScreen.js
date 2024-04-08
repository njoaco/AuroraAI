import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Features from '../components/features';
import { Video } from 'expo-av';
import sendIcon from '../assets/icons/send.png';
import loadingIcon from '../assets/icons/loading.gif';
import { apiCall } from '../backend/openAI';

//a

export default function HomeScreen() {

  const [messages, setMessages] = useState([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const ScrollViewRef = useRef();

  const fetchResponse = () => {
    if (result.trim().length>0){
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);
      updateScrollView();
      setLoading(true);
      apiCall(result.trim(), newMessages).then(res=>{
        //console.log('got api data: ', res);
        setLoading(false);
        if(res.success){
          setMessages([...res.data]);
          updateScrollView();
          setResult('');
        }else{
          Alert.alert('error', res.msg);
        }
      })
    }
  }

  const updateScrollView = () => {
    setTimeout(() =>{
      ScrollViewRef?.current?.scrollToEnd({animated: true})
    },200)
  }

  return (
      <View className="flex-1">
        <Video
          source={require('../assets/background_chat2_compress.mp4')} 
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
          shouldPlay
          isLooping
          resizeMode="cover"
        />
        <SafeAreaView>    
          <ScrollView>
          <KeyboardAvoidingView>
            <View style={{marginTop: 60}}>

              {

                messages.length>0? (
                  <View className="space-y-2 flex: 1">
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.text}>
                        AURORA
                      </Text>
                      <Text></Text>
                    </View>
                    
                    <View style={{height: hp(58), margin:15} } className="bg-blue-300 rounded-3xl p-4">
                      <ScrollView ref={ScrollViewRef} bounces={false} className="space-y-4" showsHorizontalScrollIndicator={false}>
                        {
                          messages.map((message, index) => {
                            if (message.role === 'assistant') {
                              if (message.content.includes('https')) {
                                return (
                                  <View key={index} className="flex-row justify-start">
                                    <View className="p-2 flex rounded-2xl bg-blue-800 rounded-tl-none">
                                      <Image
                                        key={index} // Aquí agregamos la prop key con un valor único
                                        source={{ uri: message.content }}
                                        className="rounded-2xl"
                                        resizeMode='contain'
                                        style={{ height: wp(60), width: wp(60) }}
                                      />
                                    </View>
                                  </View>
                                )
                              } else {
                                return (
                                  <View key={index} style={{ width: wp(70) }} className="bg-blue-800 rounded-xl p-2 rounded-tl-none">
                                    <Text style={styles.IAText}>
                                      {message.content}
                                    </Text>
                                  </View>
                                )
                              }
                            } else {
                              return (
                                <View key={index} className="flex row justify-end">
                                  <View style={{ width: wp(70), marginLeft: 55 }} className="bg-white rounded-xl p-2 rounded-tr-none">
                                    <Text style={styles.UserText}>
                                      {message.content}
                                    </Text>
                                  </View>
                                </View>
                              )
                            }
                          })
                        }
                      </ScrollView>
                    </View>
                  </View>
                ): (
                  <Features />
                )

              }

            </View>

          <View className="flex justify-center items-center flex-row">
            <TextInput className="bg-blue-800"
              style={{
                padding: 10,
                borderRadius: 10,
                color: 'white',
                width: '80%',
                alignSelf: 'center',
                fontFamily:'DMSansMedium'
              }}
              placeholder="Escribe aquí..."
              placeholderTextColor="white"
              onChangeText={text => setResult(text)}
              value={result}
            />
            <TouchableOpacity 
              className="ml-2 bg-blue-800 rounded-full p-2"
              onPress={() => {
                console.log(result); 
                fetchResponse();
                setResult('');
              }}
            >
              {loading ? (
                <Image source={loadingIcon} style={{ width: 24, height: 24 }} />
              ) : (
                <Image source={sendIcon} style={{ width: 24, height: 24 }} />
              )}
            </TouchableOpacity>
          </View>
                </KeyboardAvoidingView>
        </ScrollView>
        </SafeAreaView>
      </View>
  );
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
  UserText: {
    fontFamily: 'DMSansMedium',
    fontSize: 14,
    color: 'black',
  },
  IAText: {
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
