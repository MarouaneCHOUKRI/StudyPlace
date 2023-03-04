import { Text, View, StyleSheet, Image, Pressable, SafeAreaView, Linking, NativeModules, Platform} from 'react-native';
import Constants from 'expo-constants';
import  { useEffect } from 'react';
import { useFonts } from 'expo-font';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Updates from 'expo-updates';
import Amiens from '../assets/Ville/Amiens.json'
import Lille from '../assets/Ville/Lille.json'
import Arras from '../assets/Ville/Arras.json'
import PasDeCalais from '../assets/Ville/PasDeCalais.json'
import Beauvais from '../assets/Ville/Beauvais.json'
import Soissons from '../assets/Ville/Soissons.json'
import Abbeville from '../assets/Ville/Abbeville.json'
import Laon from '../assets/Ville/Laon.json'
import Dunkerque from '../assets/Ville/Dunkerque.json'
import Roubaix from '../assets/Ville/Roubaix.json'
import SaintOmer from '../assets/Ville/Saint-Omer.json'
import Lens from '../assets/Ville/Lens.json'
import Chantilly from '../assets/Ville/Chantilly.json'
import Bethune from '../assets/Ville/Bethune.json'
import Noyon from '../assets/Ville/Noyon.json'

const { RNAndroidOpenSettings } = NativeModules;

export default function App({navigation }) {

  const [fontsLoaded] = useFonts({ 'NunitoSans-Regular': require('./../assets/fonts/NunitoSans-Regular.ttf'), 'NunitoSans-Light': require('./../assets/fonts/NunitoSans-Light.ttf'), 'NunitoSans-Bold': require('./../assets/fonts/NunitoSans-Bold.ttf')});

  const cities = [...Object.values(Amiens), ...Object.values(Lille), ...Object.values(Arras), ...Object.values(PasDeCalais), 
  ...Object.values(Beauvais),...Object.values(Soissons),...Object.values(Abbeville),...Object.values(Laon),...Object.values(Dunkerque),...Object.values(Roubaix),...Object.values(SaintOmer),...Object.values(Lens),...Object.values(Chantilly),...Object.values(Bethune),...Object.values(Noyon)];

  useEffect(() => {

    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {

        alert("Afin d'utiliser StudyPlace, vous devez activer la localisation. \n\n Vous allez être rediriger vers Paramètres, puis appuyer sur Localisation > Activer la localisation pendant l'utilisation de l'application.")

        setTimeout(()=>{
          
        if (Platform.OS === 'ios') {
          
          Linking.openURL("app-settings:");
          Updates.reloadAsync()

        } else {
          
          RNAndroidOpenSettings.generalSettings();
          Updates.reloadAsync()
          
        }}, "8000")

      }

    })();

  }, []);

  return (
    
<View style={styles.container}>

        <View>
          
          <MapView 
            style={styles.map}
            showsUserLocation={true}
            showsCompass = {false}
            mapPadding={{top:18, bottom:50}}
            initialRegion={{
              latitude: 49.583648,
              longitude: 2.490480,
              latitudeDelta: 5,
              longitudeDelta: 0.2,
            }}
          >
          
            {cities.map((item) => 
              <Marker
                key={item.id}
                coordinate={{ latitude : item.LatLong.latitude , longitude : item.LatLong.longitude }}  
                title={item.Nom}
                description={item.Adresse}
                image={require('./../assets/images/pin.png')}
              />
            )}

          </MapView>

        </View>

        <View style={{flexDirection: 'row',  marginTop : 30, position: 'absolute'}}>
          
          <View style={{flex: 1, alignSelf: 'center', alignItems: 'center'}} >
            <Pressable onPress={()=> navigation.goBack()}>
              <Image
                source={require('./../assets/images/Croix.png')}
                style={{height: 35, width: 35}}
              />
            </Pressable>
          </View>

          <View style={{flex: 3}}>
            <Pressable onPress={()=> navigation.navigate("Recherche")}> 
              <View style={{flex: 1, backgroundColor: 'white', height: 40}}>
                <Text style={{fontFamily:'NunitoSans-Regular', margin: 10, fontSize: 14}}>Rechercher une ville...</Text>
              </View>
            </Pressable>
          </View>

          <View style={{flex: 1}}></View>

        </View>

        <SafeAreaView style={{position: 'absolute', bottom: 0, backgroundColor:'white', width: '100%'}}>
          
          <View style={{flexDirection: 'row', backgroundColor:'#3F6795', padding: 6}}>
          
            <Pressable style={{flex: 1}}>
              <Text style={{fontSize: 13, fontFamily: 'NunitoSans-Bold', textAlign: 'center', color: 'white'}}>
                Accueil
              </Text> 
            </Pressable>  

            <Pressable onPress={() => navigation.navigate("Information")} style={{flex: 1}}>
              <Text style={{fontSize: 13, fontFamily: 'NunitoSans-Regular', textAlign: 'center', color: 'white'}}>
                Information
              </Text> 
            </Pressable>

          </View>
            

        </SafeAreaView>

      </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
