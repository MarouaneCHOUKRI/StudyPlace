import { Text, View, StyleSheet, Pressable, Image} from 'react-native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';


export default function App({ navigation }) {
  
  const [fontsLoaded] = useFonts({
    
    'NunitoSans-Regular': require('./../assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Light': require('./../assets/fonts/NunitoSans-Light.ttf'),
    'NunitoSans-Bold': require('./../assets/fonts/NunitoSans-Bold.ttf'),
  
  });

  return (
    
    <View style={styles.container}>

      <View style={{flex: 1, alignSelf: 'center', paddingTop: 70}}>
        <Image
          source={require('./../assets/images/logo.png')}
          style={{width: 250, height: 76}}
        />
      </View>
      
      <View style={{flex: 1.3}}>
        
        <Text style={{fontSize: 12, fontFamily: 'NunitoSans-Regular', alignSelf: 'center', paddingBottom: 23}}>
          La référence de recherche d’espace de coworking par excellence
        </Text>

        <Pressable onPress={() => navigation.navigate("HautsDeFrance")} style={{backgroundColor: '#359AF6', aspectRatio: 4,  width: 98, borderRadius: 7, justifyContent: 'center', alignSelf: 'center'}}>
          <Text style={{fontSize: 12, fontFamily: 'NunitoSans-Bold', color:'white', textAlign: 'center'}}>Commencer</Text>
        </Pressable>  
        
        <Text style={{fontSize: 11, fontFamily: 'NunitoSans-Light', position: 'absolute', bottom: 0, alignSelf: 'center', paddingBottom: 31}}>
        © 2023 StudyPlace |  All Rights reserved
        </Text>
      
      </View>    

    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

});
