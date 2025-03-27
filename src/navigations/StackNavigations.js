import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../screens/Splash';

import Onboard from '../screens/Onboard';
import GoogleLogin from '../screens/GoogleLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupwithEmail from '../screens/SignupwithEmail';
import LoginwithEmail from '../screens/LoginwithEmail';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function StackNavigations() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [splashLogo, setSplashLogo] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const value = await AsyncStorage.getItem('onboardingShown');
        if (value === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('onboardingShown', 'true');
        } else {
          setIsFirstLaunch(false);
        }

        setTimeout(() => setSplashLogo(false), 3000);
      } catch (error) {
        console.log('Error initializing app:', error);
      }
    };

    initializeApp();
  }, []);

  if (splashLogo || isFirstLaunch === null) {
    return <Splash />;
  }
  return (
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? 'onboard' : 'Home'}
      screenOptions={{headerShown: false}}
    
      >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="onboard" component={Onboard} />
      <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
      <Stack.Screen name="SignupwithEmail" component={SignupwithEmail}/>
      <Stack.Screen name="LoginwithEmail" component={LoginwithEmail}/>
      <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
  );
}
