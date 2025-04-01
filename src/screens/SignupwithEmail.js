import {
  Alert,
  Dimensions,
  Keyboard,
  Modal,
  PixelRatio,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';

import Eyeon from '../assets/Icons/Eyeon.svg';
import Eyeoff from '../assets/Icons/Eyeoff.svg';
import Checkbox from '../assets/Icons/Checkbox.svg';
import Tick from '../assets/Icons/Tick.svg';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import Success from '../assets/Icons/Success.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function SignupwithEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const [ischeck, setIscheck] = useState(false);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    confirmPassword: null,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const registerUser = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      console.log(' User account created', user.uid);

      await AsyncStorage.setItem('userId', user.uid);

      setModalVisible(true);
    } catch (error) {
      console.error('Registration Error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters!';
      }

      Alert.alert('Registration Error', errorMessage);
    }
  };

  const validateEmail = email => /\S+@\S+\.\S+/.test(email);
  const validatePassword = password => password.length >= 8;

  const handleValidation = (field, value) => {
    let newErrors = {...errors};

    if (field === 'email') {
      newErrors.email =
        value.length === 0
          ? null
          : validateEmail(value)
          ? 'Email is valid'
          : 'Enter a valid email address';
    }

    if (field === 'password') {
      newErrors.password =
        value.length === 0
          ? null
          : validatePassword(value)
          ? 'Password is valid'
          : 'Password must be at least 8 characters';
    }

    if (field === 'confirmPassword') {
      newErrors.confirmPassword =
        value.length === 0
          ? null
          : value === password
          ? 'Passwords match'
          : 'Passwords do not match';
    }

    setErrors(newErrors);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.headertxtcontainer}>
            <Text style={styles.headertxt}>Signup with Email</Text>
          </View>
          <View style={styles.inputwrapper}>
            <Text style={styles.label}>Email</Text>
            <View
              style={[
                styles.inicon,
                {
                  borderColor:
                    errors.email === null
                      ? '#A7A5AF'
                      : errors.email === 'Email is valid'
                      ? '#0E8345'
                      : '#DE1135',
                },
              ]}>
              <TextInput
                placeholder="Enter Your Email"
                value={email}
                onChangeText={value => {
                  setEmail(value);
                  handleValidation('email', value);
                }}
                placeholderTextColor="#A7A5AF"
                style={styles.input}
              />
            </View>
            {errors.email ? (
              <Text
                style={[
                  styles.validationText,
                  {
                    color:
                      errors.email === 'Email is valid' ? '#0E8345' : '#DE1135',
                  },
                ]}>
                {errors.email}
              </Text>
            ) : null}
          </View>

          <View style={styles.inputwrapper}>
            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.inicon,
                {
                  borderColor:
                    errors.password === null
                      ? '#A7A5AF'
                      : errors.password === 'Password is valid'
                      ? '#0E8345'
                      : '#DE1135',
                },
              ]}>
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={passwordSecure}
                value={password}
                onChangeText={value => {
                  setPassword(value);
                  handleValidation('password', value);
                }}
                placeholderTextColor="#A7A5AF"
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setPasswordSecure(!passwordSecure)}>
                {passwordSecure ? (
                  <Eyeoff width={24} height={24} />
                ) : (
                  <Eyeon width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text
                style={[
                  styles.validationText,
                  {
                    color:
                      errors.password === 'Password is valid'
                        ? '#0E8345'
                        : '#DE1135',
                  },
                ]}>
                {errors.password}
              </Text>
            ) : null}
          </View>

          <View style={styles.inputwrapper}>
            <Text style={styles.label}>Confirm Password</Text>
            <View
              style={[
                styles.inicon,
                {
                  borderColor:
                    errors.confirmPassword === null
                      ? '#A7A5AF'
                      : errors.confirmPassword === 'Passwords match'
                      ? '#0E8345'
                      : '#DE1135',
                },
              ]}>
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={confirmSecure}
                value={confirmpassword}
                onChangeText={value => {
                  setConfirmpassword(value);
                  handleValidation('confirmPassword', value);
                }}
                placeholderTextColor="#A7A5AF"
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setConfirmSecure(!confirmSecure)}>
                {confirmSecure ? (
                  <Eyeoff width={24} height={24} />
                ) : (
                  <Eyeon width={24} height={24} />
                )}
              </TouchableOpacity>
            </View>
            {errors.confirmPassword ? (
              <Text
                style={[
                  styles.validationText,
                  {
                    color:
                      errors.confirmPassword === 'Passwords match'
                        ? '#0E8345'
                        : '#DE1135',
                  },
                ]}>
                {errors.confirmPassword}
              </Text>
            ) : null}
          </View>
          <View style={styles.termcontainer}>
            <TouchableOpacity onPress={() => setIscheck(!ischeck)}>
              {ischeck ? <Tick /> : <Checkbox />}
            </TouchableOpacity>
            <Text style={styles.txt}>Agree with</Text>
            <TouchableOpacity>
              <Text style={styles.linktxt}>Terms & Condition</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btncontainer}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => registerUser(email, password, confirmpassword)}>
              <Text style={styles.btntxt}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.overlay}>
                <View style={styles.cardcontainer}>
                  <View style={styles.successIcon}>
                    <Success />
                  </View>
                  <View style={styles.modaltxtcontainer}>
                    <Text style={styles.modaltxt}>Signup Successful!</Text>
                  </View>
                  <View style={styles.modalbtncontainer}>
                    <TouchableOpacity
                      style={styles.modalbtn}
                      onPress={() => {
                        setModalVisible(false);
                        navigation.navigate('LoginwithEmail');
                      }}>
                      <Text style={styles.modalbtntxt}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    marginBottom: height * 0.05,
  },
  headertxt: {
    fontFamily: 'Einabold',
    fontSize: fontSize(24),
    fontWeight: '400',
  },
  inputwrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.01,
  },
  label: {
    fontSize: fontSize(16),
    fontFamily: 'satoshiregular',
    fontWeight: 'bold',
    color: '#323135',
  },

  inputcontainer: {
    marginTop: height * 0.02,
  },
  inicon: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#A7A5AF',
    borderRadius: 8,
    marginTop: height * 0.005,
    paddingHorizontal: width * 0.03,
    // paddingVertical: height * 0.03,
    height: height * 0.06,
    // marginBottom: height * 0.02,
  },
  eyeIcon: {
    position: 'absolute',
    right: width * 0.03,
    top: height * 0.013,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  termcontainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: height * 0.02,
  },
  txt: {
    fontFamily: 'satoshiregular',
    fontSize: fontSize(16),
    fontWeight: '500',
  },
  linktxt: {
    fontFamily: 'satoshiregular',
    fontSize: fontSize(16),
    fontWeight: '500',
    color: '#452CE8',
    textDecorationLine: 'underline',
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
    backgroundColor: '#452CE8',
  },
  btntxt: {
    textAlign: 'center',
    color: '#FBFBFC',
    fontFamily: 'Einabold',
    fontSize: fontSize(16),
    fontWeight: '500',
  },
  validationText: {
    marginTop: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  cardcontainer: {
    backgroundColor: '#FBFBFC',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    height: height * 0.4,
  },
  successIcon: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  modaltxtcontainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  modaltxt: {
    fontSize: fontSize(24),
    fontFamily: 'Einabold',
  },
  modalbtncontainer: {
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.07,
  },
  modalbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    height: height * 0.06,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#452CE8',
  },
  modalbtntxt: {
    textAlign: 'center',
    color: '#FBFBFC',
    fontFamily: 'Einabold',
    fontSize: fontSize(16),
    fontWeight: '500',
  },
});
