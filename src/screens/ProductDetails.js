import {
  Dimensions,
  Image,
  PixelRatio,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Backarrow from '../assets/Icons/Backarrow.svg';
import Rating from '../assets/Icons/Rating.svg';
import Down from '../assets/Icons/Downarrow.svg';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

const sizes = [
  {
    id: '1',
    size: 'S',
  },
  {
    id: '2',
    size: 'M',
  },
  {
    id: '3',
    size: 'L',
  },
  {
    id: '4',
    size: 'XL',
  },
  {
    id: '5',
    size: 'XXL',
  },
];

const colors = [
  {
    id: '1',
    name: 'Red',
    hex: '#D03D3D',
  },
  {
    id: '2',
    name: 'Purple',
    hex: '#8E3AD0',
  },
  {
    id: '3',
    name: 'Black',
    hex: '#2E2626',
  },
  {
    id: '4',
    name: 'Blue',
    hex: '#3A5BCE',
  },
  {
    id: '5',
    name: 'Pink',
    hex: '#CA38BB',
  },
];

export default function ProductDetails({route}) {
  const navigation = useNavigation();
  const {product} = route.params;

  const [selectedColor, setSelectedColor] = useState(colors[2]);
  const [selectedSize, setSelecteSize] = useState(sizes[2]);
  const [imageLoading, setImageLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});
  const [wishlist, setWishlist] = useState({});

  useEffect(() => {
    if (product.images?.length > 0) {
      setLoadingStates(
        product.images.reduce((acc, _, index) => ({...acc, [index]: true}), {}),
      );
    }
  }, [product]);

  useEffect(() => {
    const checkWishlist = async () => {
      const userId = auth().currentUser?.uid;
      if (!userId) {
        console.error('User not logged in');
        return;
      }

      const wishlistRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('wishlist')
        .doc(product.id.toString());
      const doc = await wishlistRef.get();

      if (doc.exists) {
        setWishlist(prev => ({...prev, [product.id]: true}));
      } else {
        setWishlist(prev => ({...prev, [product.id]: false}));
      }
    };
    checkWishlist();
  }, [product]);

  const toggleWishlist = async () => {
    const {
      id,
      title,
      price,
      images,
      category: {image},
    } = product;
    const userId = auth().currentUser?.uid;

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    const wishlistRef = firestore()
      .collection('users')
      .doc(userId)
      .collection('wishlist')
      .doc(id.toString());

    setWishlist(prev => ({...prev, [id]: !prev[id]}));

    try {
      if (wishlist[id]) {
        await wishlistRef.delete();
      } else {
        await wishlistRef.set({id, title, price, images, category: {image}}); // Add product to user's wishlist
      }
    } catch (error) {
      setWishlist(prev => ({...prev, [id]: !prev[id]}));
      console.error('Error updating wishlist:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headercontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Backarrow height={35} width={20} />
        </TouchableOpacity>
        <Text style={styles.headertxt}>Product Details</Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.imageContainer}>
          {imageLoading && (
            <ActivityIndicator
              size="large"
              color="#452CE8"
              style={styles.imageLoader}
            />
          )}
          <Image
            source={{
              uri:
                product?.category?.image || 'https://via.placeholder.com/150',
            }}
            style={styles.productImage}
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
        </View>

        {product.images && product.images.length > 0 && (
          <View style={styles.carouselContainer}>
            <FlatList
              data={product.images}
              horizontal
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View style={styles.imageWrapper}>
                  {loadingStates[index] && (
                    <ActivityIndicator
                      size="small"
                      color="#452CE8"
                      style={styles.imageLoader}
                    />
                  )}
                  <Image
                    source={{uri: item}}
                    style={styles.thumbnail}
                    onLoad={() =>
                      setLoadingStates(prev => ({...prev, [index]: false}))
                    }
                    onError={() =>
                      setLoadingStates(prev => ({...prev, [index]: false}))
                    }
                  />
                </View>
              )}
            />
          </View>
        )}
        <View style={styles.titlecontainer}>
          <Text style={styles.titletxt}>{product.title}</Text>
        </View>
        <View style={styles.pricecontainer}>
          <Text style={styles.pricetxt}>${product.price}</Text>
          <View style={styles.ratingcontainer}>
            <Rating />
            <Text style={styles.ratingtxt}>4.8 (16 views)</Text>
          </View>
        </View>
        <View style={styles.detailcontainer}>
          <Text style={styles.dthead}>Product Details</Text>
          <Text style={styles.dttxt}>
            Made for work or for the weekends, this plain t-shirt can be dressed
            up or down and gives any outfit the clean look you want Each top is
            made from comfortable cotton, and features short sleeves, and a
            crewneck Easy to care for, this tee can be washed with like colors
            on the gentle cycle.
          </Text>
          <Text style={styles.dttxt}>
            Made from responsibly sourced materials and with the Gap ethos in
            mind, our everyday essentials come in a wide range of fits, sizes,
            cuts, solid colors, and prints, Gap champions a uniquely optimistic
            sense of American style that bridges the gaps between individuals,
            generations, and cultures
          </Text>
        </View>
        <View style={styles.line} />

        <View style={styles.sizetxtcontiner}>
          <Text style={styles.sizetxt}>Select Size</Text>
        </View>

        <View style={styles.sizechartcontainer}>
          <FlatList
            horizontal
            data={sizes}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View>
                <TouchableOpacity onPress={() => setSelecteSize(item)}>
                  <View
                    style={[
                      styles.chartincontainer,
                      {
                        backgroundColor:
                          selectedSize.id === item.id ? '#452CE8' : '#FFFFFF',
                      },
                    ]}>
                    <Text style={styles.charttxt}>{item.size}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View style={styles.clrtxtcontainer}>
          <Text style={styles.clrtxt}>Select Color: {selectedColor.name}</Text>
        </View>

        <View style={styles.clrchartcontainer}>
          <FlatList
            data={colors}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: item.hex,
                    borderWidth: selectedColor.id === item.id ? 2 : 0,
                  },
                ]}
                onPress={() => setSelectedColor(item)}
              />
            )}
          />
        </View>

        <View style={styles.bottomtxtcontainer}>
          <Text style={styles.bottomtxt}>Ratings & Reviews</Text>
          <Down />
        </View>
        <View style={styles.line} />

        <View style={styles.btncontainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              toggleWishlist(product);
            }}>
            <Text style={styles.btntxt}>
              {wishlist[product.id]
                ? 'Remove from Wishlist'
                : 'Add to Wishlist'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  productImage: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  carouselContainer: {
    marginTop: height * 0.02,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    marginRight: width * 0.03,
  },
  thumbnail: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  titlecontainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.03,
  },
  titletxt: {
    fontFamily: 'satoshivariable',
    fontSize: fontSize(18),
    fontWeight: '600',
  },
  pricecontainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  ratingcontainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: height * 0.003,
  },

  pricetxt: {
    fontFamily: 'Einabold',
    fontSize: fontSize(20),
  },
  ratingtxt: {
    fontSize: fontSize(14),
  },
  detailcontainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  dthead: {
    fontFamily: 'Einabold',
    fontSize: fontSize(16),
    marginBottom: height * 0.015,
  },
  dttxt: {
    fontFamily: 'sflight',
    fontSize: fontSize(14),
    lineHeight: 20,
    textAlign: 'left',
  },
  line: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#E0E0E5',
    marginTop: height * 0.03,
    alignSelf: 'center',
  },
  sizetxtcontiner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  sizetxt: {
    fontFamily: 'Einabold',
    fontSize: fontSize(16),
  },
  sizechartcontainer: {
    width: '90%',
    alignSelf: 'center',
  },
  chartincontainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.015,
    marginRight: width * 0.05,
    borderColor: '#A7A5AF',
  },
  charttxt: {
    fontSize: fontSize(16),
    fontFamily: 'satoshivariable',
    fontweigt: '500',
  },
  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 8,
    borderColor: 'blue',
  },
  clrtxtcontainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.03,
  },
  clrtxt: {
    fontFamily: 'satoshivariable',
    fontSize: fontSize(16),
  },
  clrchartcontainer: {
    marginTop: height * 0.02,
    width: '90%',
    alignSelf: 'center',
  },
  bottomtxtcontainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomtxt: {
    fontFamily: 'satoshivariable',
    fontSize: fontSize(18),
    fontweigt: '500',
  },
  btncontainer: {
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.07,
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
});
