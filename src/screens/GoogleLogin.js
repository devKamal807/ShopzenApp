import {
    Dimensions,
    PixelRatio,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useEffect } from 'react';
  import GoogleIcon from '../assets/Icons/Googleicon.svg';
  import Appleicon from '../assets/Icons/Appleicon.svg';
  import {useNavigation} from '@react-navigation/native';
  import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
  
  const {width, height} = Dimensions.get('window');
  const fontSize = size => PixelRatio.getFontScale() * size;
  
  export default function GoogleLogin() {
    const navigation = useNavigation();

    useEffect(() => {
        GoogleSignin.configure({
          webClientId:
            '945532369038-cq2vp76splkvkntb2nhil3jtaelm5ea5.apps.googleusercontent.com',
        });
      }, []);
    
      const signInWithGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    
          await GoogleSignin.signOut();
          const idToken = await GoogleSignin.signIn();
          console.log('Google Sign-In Success, idToken:', idToken);
          const googleCredential = auth.GoogleAuthProvider.credential(
            idToken.data.idToken,
          );
          await auth().signInWithCredential(googleCredential);
          console.log('User signed in with Google!');
        } catch (err) {
          console.log('sign in failed', err);
          if (err.code) {
            console.log('Error code:', err.code);
          }
          if (err.message) {
            console.log('Error message:', err.message);
          }
        }
      };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headertxtcontainer}>
          <Text style={styles.headertxt}>Login to ShopZen</Text>
        </View>
        <View style={styles.logbtncontainer}>
          <TouchableOpacity style={styles.google} onPress={signInWithGoogle}>
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
  