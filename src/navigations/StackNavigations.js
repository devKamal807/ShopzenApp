import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

import Splash from '../screens/Splash';
import Onboard from '../screens/Onboard';
import GoogleLogin from '../screens/GoogleLogin';
import SignupwithEmail from '../screens/SignupwithEmail';
import LoginwithEmail from '../screens/LoginwithEmail';
import ProductDetails from '../screens/ProductDetails';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

export default function StackNavigations() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [splashLogo, setSplashLogo] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if onboarding has been shown
        const onboardingShown = await AsyncStorage.getItem('onboardingShown');
        setIsFirstLaunch(onboardingShown === null);

        // Check if the user is logged in
        const user = auth().currentUser;
        setIsLoggedIn(!!user);

        // Store onboarding status if not set
        if (onboardingShown === null) {
          await AsyncStorage.setItem('onboardingShown', 'true');
        }

        // Show splash screen for 3 seconds
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
      initialRouteName={isFirstLaunch ? 'onboard' : isLoggedIn ? 'TabNavigation' : 'GoogleLogin'}
      screenOptions={{headerShown: false}}>
      
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="onboard" component={Onboard} />
      <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
      <Stack.Screen name="SignupwithEmail" component={SignupwithEmail} />
      <Stack.Screen name="LoginwithEmail" component={LoginwithEmail} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}
