import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackNavigations from './src/navigations/StackNavigations'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigations/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})