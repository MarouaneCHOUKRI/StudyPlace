import { Text, View, StyleSheet, Pressable, SafeAreaView, Linking} from 'react-native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';

export default function App({ navigation }) {
  
  const [fontsLoaded] = useFonts({
    
    'NunitoSans-Regular': require('./../assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Light': require('./../assets/fonts/NunitoSans-Light.ttf'),
    'NunitoSans-Bold': require('./../assets/fonts/NunitoSans-Bold.ttf'),
  
  });

  
  return (
    
    <View style={{ flex: 1 }}>
      
      <View style={styles.container}>

        <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop: "50%"}}>
          <Text style={{fontSize: 24, color:'white', fontFamily: 'NunitoSans-Regular'}}>Study</Text>
          <Text style={{fontSize: 24, color: '#67FF92', fontFamily: 'NunitoSans-Regular'}}>Place</Text>
        </View>

        <View style={{paddingTop: 80}}>
          <Text onPress={() => Linking.openURL('https://sites.google.com/view/study--place/accueil')} style={{fontSize: 14, color:'white', textAlign: 'center', paddingBottom: 24, fontFamily: 'NunitoSans-Regular'}}>Information sur l’application</Text>
          <Text onPress={() => Linking.openURL('https://forms.gle/mVCxrNnxmJ5FZR6t9')} style={{fontSize: 14, color:'white', textAlign: 'center', paddingBottom: 24, fontFamily: 'NunitoSans-Regular'}}>Envoyer nous un feedback</Text>
          <Text style={{fontSize: 14, color:'white', textAlign: 'center', paddingBottom: 103, fontFamily: 'NunitoSans-Regular'}}>v. 1.0.0</Text>
          <Text style={{fontSize: 12, color:'white', textAlign: 'center', fontFamily: 'NunitoSans-Regular'}}>© 2023 StudyPlace |  All Rights reserved</Text>
        </View>

        <SafeAreaView style={{position: 'absolute', bottom: 0, backgroundColor:'white', width: '100%'}}>
          
          <View style={{flexDirection: 'row', backgroundColor:'white', padding: 6}}>
          
            <Pressable onPress={() => navigation.navigate("HautsDeFrance")} style={{flex: 1}}>
              <Text style={{fontSize: 13, fontFamily: 'NunitoSans-Regular', textAlign: 'center', color: '#2D4664'}}>
                Accueil
              </Text> 
            </Pressable>  

            <Pressable onPress={() => navigation.navigate("Information")} style={{flex: 1}}>
              <Text style={{fontSize: 13, fontFamily: 'NunitoSans-Bold', textAlign: 'center', color: '#2D4664'}}>
                Information
              </Text> 
            </Pressable>

          </View>
            

        </SafeAreaView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: '#2D4664',
  },
});
