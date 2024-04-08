import React from 'react';
import AppNavigation from './Navigation';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    AlienRobot: require('./assets/fonts/AlienRobot.ttf'),
    DMSansRegular: require('./assets/fonts/DMSans-Regular.ttf'),
    DMSansMedium: require('./assets/fonts/DMSans-Medium.ttf'),
    DMSansBold: require('./assets/fonts/DMSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppNavigation />
  );
}