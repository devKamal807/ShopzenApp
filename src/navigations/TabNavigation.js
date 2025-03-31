import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Saved from '../screens/Saved';
import Account from '../screens/Account';

import HomeIcon from '../assets/Icons/Home.svg';
import HeartIcon from '../assets/Icons/Heart.svg';
import UserIcon from '../assets/Icons/UserIcon.svg';
import {View, Text, StyleSheet, Dimensions, PixelRatio} from 'react-native';
import Hearttab from '../assets/Icons/Hearttab.svg';
import Homefill from '../assets/Icons/Homefill.svg';
import Userfill from '../assets/Icons/Userfill.svg';

const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let IconComponent;
          let label;

          if (route.name === 'Home') {
            IconComponent = focused ? Homefill : HomeIcon;
            label = 'Home';
          } else if (route.name === 'Saved') {
            IconComponent = focused ? Hearttab : HeartIcon;
            label = 'Saved';
          } else if (route.name === 'Account') {
            IconComponent = focused ? Userfill : UserIcon;
            label = 'Account';
          }
          

          return (
            <View style={styles.iconContainer}>
              <IconComponent
                width={20}
                height={20}
                stroke={focused ? '#452CE8' : '#000'}
                strokeWidth={1}
                fill="none"
              />
              <Text style={[styles.label, focused && styles.activeLabel]}>
                {label}
              </Text>
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Saved" component={Saved} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.01,
  },
  label: {
    fontSize: 8,
    color: '#000',
    marginTop: height * 0.002,
  },
  activeLabel: {
    color: '#452CE8',
    fontWeight: 'bold',
  },
});
