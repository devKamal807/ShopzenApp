import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  PixelRatio,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Bell from '../assets/Icons/Bell.svg';
import Searchicon from '../assets/Icons/Searchicon.svg';
import Serachvisual from '../assets/Icons/Searchvisual.svg';
import Dress from '../assets/Icons/Dress.svg';
import Dumble from '../assets/Icons/Dumble.svg';
import Sofa from '../assets/Icons/Sofa.svg';
import Game from '../assets/Icons/Game.svg';
import Pencil from '../assets/Icons/Pencil.svg';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';

import Rating from '../assets/Icons/Rating.svg';
import Heart from '../assets/Icons/Heart.svg';
import Heratfill from '../assets/Icons/Heartfill.svg';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const fontSize = size => PixelRatio.getFontScale() * size;

const icondata = [
  {
    id: '1',
    icon: <Dress width={20} height={20} />,
    name: 'Fashion',
  },
  {
    id: '2',
    icon: <Dumble width={20} height={20} />,
    name: 'Fitness',
  },
  {
    id: '3',
    icon: <Sofa width={20} height={20} />,
    name: 'Living',
  },
  {
    id: '4',
    icon: <Game width={20} height={20} />,
    name: 'Games',
  },
  {
    id: '5',
    icon: <Pencil width={20} height={20} />,
    name: 'Stationery',
  },
  {
    id: '6',
    icon: <Pencil width={20} height={20} />,
    name: 'Beauty',
  },
];

const banners = [
  {
    id: '1',
    image: require('../assets/Images/Lpimage.png'),
  },
  {
    id: '2',
    image: require('../assets/Images/Lpimage.png'),
  },
  {
    id: '3',
    image: require('../assets/Images/Lpimage.png'),
  },
  {
    id: '4',
    image: require('../assets/Images/Lpimage.png'),
  },
];

export default function Home() {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState();
  const [wishlist, setWishlist] = useState({});
  const [loading, setLoading] = useState(true);

  const toggleWishlist = productId => {
    setWishlist(prevState => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get('https://api.escuelajs.co/api/v1/products');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const filteredProducts = Array.isArray(data)


  
  ? data.filter(item =>
      item?.title?.toLowerCase().includes(search.trim().toLowerCase())
    )
  : [];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1,paddingBottom: 100}}
            keyboardShouldPersistTaps="handled"
            
            showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
              <View style={styles.topcontainer}>
                <View>
                  <Text style={styles.loctxt}>Location</Text>
                  <Text style={styles.adtxt}>Dhaka, Bangladesh</Text>
                </View>
                <View style={styles.bellcontainer}>
                  <TouchableOpacity>
                    <Bell />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.searchWrapper}>
                <View style={styles.searchContainer}>
                  <Searchicon />
                  <TextInput
                    style={styles.searchInput}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Find your favorite items"
                    placeholderTextColor="#8F959E"
                  />
                  <Pressable style={styles.micButton}>
                    <Serachvisual />
                  </Pressable>
                </View>
              </View>

              <View style={styles.categorywraper}>
                <View>
                  <Text style={styles.sectionTitle}>Categories</Text>
                </View>
                <View style={styles.viewContainer}>
                  <Pressable>
                    <Text style={styles.viewtitle}>View All</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.catcontainer}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={icondata}
                  keyExtractor={item => item.id}
                  keyboardShouldPersistTaps="handled"
                  initialNumToRender={5}
                  maxToRenderPerBatch={3}
                  renderItem={({item}) => (
                    <View>
                      <TouchableOpacity>
                        <View style={styles.iconcontainer}>{item.icon}</View>
                        <View style={styles.nametxtcontainer}>
                          <Text style={styles.nametxt}>{item.name}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                  nestedScrollEnabled={true}
                />
              </View>
              <View style={styles.carouselContainer}>
                <Carousel
                  width={width * 0.9}
                  height={height * 0.25}
                  autoPlay={true}
                  autoPlayInterval={2000}
                  loop
                  data={banners}
                  useScrollView={true}
                  scrollAnimationDuration={500}
                  onSnapToItem={index => setActiveIndex(index)}
                  renderItem={({item}) => (
                    <View style={styles.bannerWrapper}>
                      <Image source={item.image} style={styles.bannerImage} />
                    </View>
                  )}
                />
                <View style={styles.pagination}>
                  {banners.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.dot,
                        activeIndex === i
                          ? styles.activeDot
                          : styles.inactiveDot,
                      ]}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.hottxtcontainer}>
                <Text style={styles.hottxt}>Hot Deals</Text>
              </View>
              {loading ? (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="#452CE8" />
                </View>
              ) : (
              <View style={styles.productwrapper}>
                <FlatList
                  data={filteredProducts?.slice(0,10)}
                  numColumns={2}
                  keyExtractor={item => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  getItemLayout={(data, index) => ({
                    length: 100,
                    offset: 100 * index,
                    index,
                  })}
                  renderItem={({item}) => (
                    <View style={styles.productContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ProductDetails', {product: item})
                        }>

                        <View style={styles.heartcontainer}>
                          <TouchableOpacity
                            onPress={() => toggleWishlist(item.id)}>
                            {wishlist[item.id] ? (
                              <Heratfill height={20} width={20} />
                            ) : (
                              <Heart height={20} width={20} />
                            )}
                          </TouchableOpacity>
                        </View>
                        <Image
                          source={{uri: item.category.image}}
                          style={styles.productImage}
                        />
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.productPrice}>${item.price}</Text>
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
              </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topcontainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.04,
  },
  loctxt: {
    fontFamily: 'sflight',
    fontSize: fontSize(14),
  },
  adtxt: {
    fontFamily: 'satoshivariable',
    fontSize: fontSize(14),
    fontWeight: '300',
  },
  bellcontainer: {
    marginTop: height * 0.005,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBFBFC',
    borderRadius: 10,
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.01,
    flex: 1,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  searchInput: {
    flex: 1,
    fontSize: fontSize(14),
    color: '#000',
  },
  categorywraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
    width: '90%',
    alignSelf: 'center',
  },

  sectionTitle: {
    fontSize: fontSize(17),
    fontWeight: '500',
    marginBottom: height * 0.01,
    fontFamily: 'sfbold',
  },
  viewContainer: {
    alignItems: 'flex-end',
  },
  viewtitle: {
    fontSize: fontSize(13),
    fontWeight: '400',
    opacity: 0.4,
    fontFamily: 'sfbold',
  },
  catcontainer: {
    width: '90%',
    alignSelf: 'center',
  },
  iconcontainer: {
    alignItems: 'center',
    marginHorizontal: width * 0.02,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    borderRadius: 10,
    backgroundColor: '#EBEFFF',
    gap: 5,
    width: '90%',
    alignSelf: 'center',
  },
  nametxtcontainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  nametxt: {
    fontSize: fontSize(13),
    fontFamily: 'sflight',
    fontWeight: '700',
    opacity: 0.5,
  },
  carouselContainer: {
    alignItems: 'center',
    marginTop: height * 0.04,
  },
  bannerWrapper: {
    width: width * 0.9,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: height * 0.2,
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: width * 0.02,
    height: height * 0.01,
    borderRadius: 4,
    marginHorizontal: width * 0.01,
  },
  activeDot: {
    backgroundColor: '#452CE8',
  },
  inactiveDot: {
    backgroundColor: '#E0E0E5',
  },
  hottxtcontainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  hottxt: {
    fontFamily: 'satoshiregular',
    fontWeight: '700',
    fontSize: fontSize(16),
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
