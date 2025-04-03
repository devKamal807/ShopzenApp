import {
  Alert,
  Dimensions,
  Image,
  PixelRatio,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import {launchImageLibrary} from 'react-native-image-picker';

import Backarrow from '../assets/Icons/Backarrow.svg';
import Upload from '../assets/Icons/UploadImage.svg';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function EditProduct() {
  const route = useRoute();
  const navigation = useNavigation();
  const {product} = route.params;

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.images[0]);

  const handleUpdate = async () => {
    const updatedProduct = {
      title,
      price: parseFloat(price),
      images: [image],
    };

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${product.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();
      console.log('Product updated:', data);

      Alert.alert('Success', 'Product updated successfully!');

      navigation.navigate('TabNavigation');
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headercontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Backarrow height={35} width={20} />
        </TouchableOpacity>
        <Text style={styles.headertxt}>Edit Product</Text>
      </View>

      <View style={styles.inputwrapper}>
        <View style={styles.labelcontainer}>
          <Text style={styles.label}>Title</Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput value={title} onChangeText={setTitle} />
        </View>
      </View>

      <View style={styles.inputwrapper}>
        <View style={styles.labelcontainer}>
          <Text style={styles.label}>Price</Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />
        </View>
      </View>

      <View style={styles.updatecontainer}>
        <TouchableOpacity style={styles.updatebtn} onPress={handleUpdate}>
          <Text style={styles.btntxt}>Update</Text>
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
  productImage: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: height * 0.02,
  },
  uploadcontainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  uploadbtn: {
    flexDirection: 'row',
  },
  uploadtxt: {
    fontSize: fontSize(15),
    marginLeft: width * 0.005,
    marginTop: height * 0.003,
  },
});
