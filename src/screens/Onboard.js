import {
    Button,
    Dimensions,
    PixelRatio,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import Onboardimg from '../assets/Icons/Onboardimg.svg';
  import {useNavigation} from '@react-navigation/native';
  
  const {width, height} = Dimensions.get('window');
  const fontSize = size => PixelRatio.getFontScale() * size;
  
  export default function Onboard() {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imgcontainer}>
          <Onboardimg />
        </View>
        <View style={styles.txtContainer}>
          {/* <View> */}
          <Text style={styles.headtxt}>Welcome to ShopZen</Text>
          {/* </View> */}
          {/* <View> */}
          <Text style={styles.subtxt}>
            Your one-stop destination for hassle-free online shopping
          </Text>
          {/* </View> */}
        </View>
        <View style={styles.btncontainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate('GoogleLogin');
            }}>
            <Text style={styles.btntxt}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    imgcontainer: {
      marginTop: height * 0.1,
    },
    txtContainer: {
      width: '90%',
      alignSelf: 'center',
      alignItems: 'center',
    },
    headtxt: {
      fontFamily: 'Einabold',
      fontWeight: '400',
      fontSize: fontSize(32),
    },
    subtxt: {
      textAlign: 'center',
      fontFamily: 'satoshiregular',
      fontSize: fontSize(18),
      fontWeight: '500',
      marginTop: height * 0.03,
      lineHeight: 25,
    },
    btncontainer: {
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center',
      marginTop: height * 0.05,
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width * 0.9,
      height: height * 0.06,
      borderRadius: 10,
      justifyContent: 'center',
      // marginVertical: height * 0.015,
      backgroundColor: '#452CE8',
      gap: 10,
    },
    btntxt: {
      textAlign: 'center',
      color: '#FBFBFC',
      fontFamily: 'Inder',
      fontSize: fontSize(16),
      fontWeight: '500',
    },
  });
  