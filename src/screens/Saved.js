import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

import Back from '../assets/Icons/Backarrow.svg';
import Bell from '../assets/Icons/Bell.svg';
import Rating from '../assets/Icons/Rating.svg';
import Heart from '../assets/Icons/Heart.svg';
import Heartfill from '../assets/Icons/Heartfill.svg';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

export default function Saved() {
  const navigation = useNavigation();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;
    setUserId(user ? user.uid : null);

    if (userId) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(userId)
        .collection('wishlist')
        .onSnapshot(snapshot => {
          setWishlistItems(snapshot.docs.map(doc => doc.data()));
        });

      return () => unsubscribe();
    }
  }, [userId]);

  const toggleWishlist = async item => {
    if (!userId) return;

    try {
      const itemRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('wishlist')
        .doc(item.id.toString());

      if (wishlistItems.find(i => i.id === item.id)) {
        await itemRef.delete();
        setWishlistItems(prevItems => prevItems.filter(i => i.id !== item.id));
      } else {
        await itemRef.set(item);
        setWishlistItems(prevItems => [...prevItems, item]);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  return (
    <SafeAreaView style={styles.conatainer}>
      <View style={styles.headercontainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back height={35} width={20} />
        </TouchableOpacity>
        <Text style={styles.headertxt}>Saved Items</Text>
        <TouchableOpacity>
          <Bell height={35} width={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.productwrapper}>
          {wishlistItems.length === 0 ? (
            <Text style={styles.emptyText}>Your wishlist is empty.</Text>
          ) : (
            <FlatList
              data={wishlistItems}
              numColumns={2}
              keyExtractor={item => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={styles.productContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        'ProductDetails',
                        {product: item},
                        console.log(item),
                      )
                    }>
                    <View style={styles.heartcontainer}>
                      <TouchableOpacity onPress={() => toggleWishlist(item)}>
                        <Heartfill height={20} width={20} />
                      </TouchableOpacity>
                    </View>
                    <Image
                      source={{uri: item.category.image}}
                      style={styles.productImage}
                    />
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.ratingcontainer}>${item.price}</Text>
                    <View style={styles.ratingcontainer}>
                      <Rating />
                      <Text>4.8 (120)</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              nestedScrollEnabled={true}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
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
  productwrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  productContainer: {
    width: width * 0.4,
    margin: 10,
    // padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: height * 0.25,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    marginTop: height * 0.03,
    textAlign: 'left',
    marginLeft: width * 0.02,
    fontFamily: 'satoshiregular',
    color: '#323135',
  },
  productPrice: {
    fontSize: fontSize(16),
    color: '#323135',
    fontWeight: '600',
    marginLeft: width * 0.02,
    textAlign: 'left',
    marginTop: height * 0.01,
  },
  ratingcontainer: {
    flexDirection: 'row',
    marginLeft: width * 0.02,
    marginTop: height * 0.01,
    marginBottom: height * 0.015,
    gap: 7,
  },
  heartcontainer: {
    position: 'absolute',
    top: height * 0.01,
    right: width * 0.02,
    borderRadius: 5,
    zIndex: 1,
    backgroundColor: '#FBFBFC80',
    padding: 3,
  },
});
