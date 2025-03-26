import {
    Dimensions,
    PixelRatio,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import GoogleIcon from '../assets/Icons/Googleicon.svg';
  import Appleicon from '../assets/Icons/Appleicon.svg';
  import {useNavigation} from '@react-navigation/native';
  
  const {width, height} = Dimensions.get('window');
  const fontSize = size => PixelRatio.getFontScale() * size;
  
  export default function GoogleLogin() {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headertxtcontainer}>
          <Text style={styles.headertxt}>Login to ShopZen</Text>
        </View>
  
        <View style={styles.logbtncontainer}>
          <TouchableOpacity style={styles.google}>
            <GoogleIcon />
            <Text>Login with Google</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.google}>
            <Appleicon />
            <Text>Login with Apple</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.text}>Or</Text>
          <View style={styles.line} />
        </View>
  
        <View style={styles.btncontainer}>
          <TouchableOpacity style={styles.btn} onPress={()=>{navigation.navigate('LoginwithEmail')}}>
            <Text style={styles.btntxt}>Login with Email</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.bottomcontainer}>
          <View style={styles.bottomwrapper}>
            <Text style={styles.normaltxt}>Don't have any account yet?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignupwithEmail');
              }}>
              <Text style={styles.lnktxt}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    headertxtcontainer: {
      width: '90%',
      alignSelf: 'center',
      marginTop: height * 0.05,
    },
    headertxt: {
      fontFamily: 'Einabold',
      fontSize: fontSize(32),
      fontWeight: '400',
    },
    logbtncontainer: {
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center',
      marginTop: height * 0.05,
    },
  
    google: {
      flexDirection: 'row',
      alignItems: 'center',
      width: width * 0.9,
      height: height * 0.06,
      borderRadius: 10,
      justifyContent: 'center',
      marginVertical: height * 0.015,
      borderWidth: 1.5,
      borderColor: '#DAE2FF',
      gap: 10,
    },
    lineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      alignSelf: 'center',
      marginTop: height * 0.05,
      marginBottom: height * 0.05,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: '#CECDD4',
    },
    text: {
      marginHorizontal: 10,
      textAlign: 'center',
      color: '#938F9C',
      fontWeight: '500',
      fontSize: fontSize(16),
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
      fontFamily: 'Einabold',
      fontSize: fontSize(16),
      fontWeight: '500',
    },
    bottomcontainer: {
      width: '90%',
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: height * 0.3,
    },
    bottomwrapper: {
      flexDirection: 'row',
      gap: 3,
    },
    normaltxt: {
      fontFamily: 'satoshiregular',
      fontSize: fontSize(16),
      fontWeight: '400',
    },
    lnktxt: {
      fontFamily: 'satoshiregular',
      fontSize: fontSize(16),
      fontWeight: '500',
      color: '#452CE8',
      textDecorationLine: 'underline',
      textDecorationColor: '#452CE8',
    },
  });
  