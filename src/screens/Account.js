import {
  Alert,
  Dimensions,
  PixelRatio,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Back from '../assets/Icons/Backarrow.svg';
import Bell from '../assets/Icons/Bell.svg';
import User from '../assets/Icons/UserIcon.svg';
import Right from '../assets/Icons/rightarrow.svg';
import Paper from '../assets/Icons/Paper.svg';
import Card from '../assets/Icons/Card.svg';
import Lock from '../assets/Icons/Lock.svg';
import Help from '../assets/Icons/Help.svg';
import Invite from '../assets/Icons/Invite.svg';
import Logout from '../assets/Icons/Logout.svg';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function Account() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('isLoggedIn');
      navigation.replace('GoogleLogin');
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headercontainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back height={35} width={20} />
        </TouchableOpacity>
        <Text style={styles.headertxt}>Account</Text>
        <TouchableOpacity>
          <Bell height={35} width={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentcontainer}>
        <View style={styles.incontent}>
          <User height={25} width={20} />
          <Text style={styles.contenttxt}>Your Profile</Text>
        </View>
        <View>
          <Right height={15} width={15} />
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.contentcontainer}>
        <View style={styles.incontent}>
          <Paper height={25} width={20} />
          <Text style={styles.contenttxt}>My Orders</Text>
        </View>
        <View>
          <Right height={15} width={15} />
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.contentcontainer}>
        <View style={styles.incontent}>
          <Card height={25} width={20} />
          <Text style={styles.contenttxt}>Payment Methods</Text>
        </View>
        <View>
          <Right height={15} width={15} />
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.contentcontainer}>
        <View style={styles.incontent}>
          <Bell height={25} width={20} />
          <Text style={styles.contenttxt}>Notifications</Text>
        </View>
        <View>
          <Right height={15} width={15} />
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.contentcontainer}>
        <View style={styles.incontent}>
          <Lock height={25} width={20} />
          <Text style={styles.contenttxt}>Privacy Policy</Text>
        </View>
        <View>
          <Right height={15} width={15} />
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.contentcontainer}>
        <View style={styles.incontent}>
          <Help height={25} width={20} />
          <Text style={styles.contenttxt}>Help Center</Text>
        </View>
        <View>
          <Right height={15} width={15} />
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.contentcontainer}>
        <View style={styles.incontent}>
          <Invite height={25} width={20} />
          <Text style={styles.contenttxt}>Invite Friends</Text>
        </View>
        <View>
          <Right height={15} width={15} />
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.logoutcontainer}>
        <Logout />
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logouttxt}>Log Out</Text>
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
  headercontainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.03,
    marginBottom: height * 0.03,
  },
  headertxt: {
    fontSize: fontSize(24),
  },
  contentcontainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.03,
  },
  incontent: {
    flexDirection: 'row',
  },
  contenttxt: {
    marginLeft: width * 0.05,
    fontFamily: 'satoshivariable',
    fontWeight: '400',
    fontSize: fontSize(16),
  },
  line: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E0E0E5',
    marginTop: height * 0.02,
    alignSelf: 'center',
  },
  logoutcontainer: {
    flexDirection: 'row',
    marginTop: height * 0.05,
    width: '90%',
    alignSelf: 'center',
  },
  logouttxt: {
    marginLeft: width * 0.03,
    fontFamily: 'satoshivariable',
    fontSize: fontSize(16),
    color: '#DE1135',
  },
});
