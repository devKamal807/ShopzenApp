import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  PixelRatio,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import Backarrow from '../assets/Icons/Backarrow.svg';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function AddProduct() {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const staticImage =
    'https://rigs-and-marine.s3.us-east-1.amazonaws.com/eventCoverImage.png';

  const handleAddProduct = async () => {
    if (!title || !price) {
      Alert.alert('Error', 'Please enter all details');
      return;
    }
    setLoading(true)

    try {
      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/products/',
        {
          title,
          price: parseFloat(price),
          images: [staticImage],
          categoryId: 1,
          description: 'Static image product',
        },
      );

      console.log('Product added:', response.data);
      Alert.alert('Success', 'Product added successfully!');

      setTitle('');
      setPrice('');
      
      navigation.navigate('TabNavigation', {refresh: true});
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
    } finally{
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headercontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Backarrow height={35} width={20} />
        </TouchableOpacity>
        <Text style={styles.headertxt}>Add Product</Text>
      </View>
      <View style={styles.inputwrapper}>
        <View style={styles.labelcontainer}>
          <Text style={styles.label}>Title</Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter product title"
            placeholderTextColor="#323135"
            style={styles.inputtxt}
          />
        </View>
      </View>

      <View style={styles.inputwrapper}>
        <View style={styles.labelcontainer}>
          <Text style={styles.label}>Price</Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            value={price}
            placeholder="Enter price"
            keyboardType="numeric"
            placeholderTextColor="#323135"
            onChangeText={setPrice}
            style={styles.inputtxt}
          />
        </View>
      </View>

      <View style={styles.updatecontainer}>

      <TouchableOpacity
  style={styles.updatebtn}
  onPress={handleAddProduct}
  disabled={loading} // disable button while loading
>
  {loading ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.btntxt}>Add Product</Text>
  )}
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
    marginTop: height * 0.03,
    gap: width * 0.18,
    marginBottom: height * 0.03,
  },
  headertxt: {
    fontSize: fontSize(24),
  },

  inputwrapper: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: height * 0.02,
  },
  inputcontainer: {
    borderWidth: 1,
    borderRadius: 5,
  },
  labelcontainer: {
    marginBottom: height * 0.01,
  },
  label: {
    fontSize: fontSize(20),
    fontFamily: 'satoshivariable',
    fontWeight: '500',
  },
  updatecontainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  updatebtn: {
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#452CE8',
    height: height * 0.06,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: height * 0.05,
  },
  btntxt: {
    fontSize: fontSize(16),
    color: '#ffff',
    fontWeight: '500',
    fontFamily: 'satoshivariable',
  },
  inputtxt:{
    color:'#323135',
  }
});
