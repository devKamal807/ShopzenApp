import {
    Dimensions,
    Image,
    PixelRatio,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  
  import {useNavigation} from '@react-navigation/native';
  import LogoIcon from '../assets/Icons/LogoIcon.svg';
  
  
  
  const fontSize = size => PixelRatio.getFontScale() * size;
  
  export default function Splash() {
    const navigation = useNavigation();
   
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.splashcontent}>
          <LogoIcon />
          <Text style={styles.txt}>ShopZen</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#452CE8',
      justifyContent: 'center',
      alignItems: 'center',
    },
    splashcontent: {
      flexDirection: 'row',
      gap: 20,
    },
    txt: {
      fontSize: fontSize(45),
      fontFamily: 'Satoshi',
      fontWeight: '600',
      color: '#FBFBFC',
    },
  });
  