import { Text, View, StyleSheet, Pressable, SafeAreaView, Image, Animated, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import { useState} from 'react';
import { useFonts } from 'expo-font';
import MapView, { Marker } from 'react-native-maps';
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

export default function App({ route, navigation}) {
  
  const [fontsLoaded] = useFonts({
    
    'NunitoSans-Regular': require('./../assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Light': require('./../assets/fonts/NunitoSans-Light.ttf'),
    'NunitoSans-Bold': require('./../assets/fonts/NunitoSans-Bold.ttf'),
  
  });

  const { filtres, ville } = route.params;
  let currentCity;
  let latitude, longitude;

  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [presentation, setPresenatation] = useState();
  const [nom, setNom] = useState();
  const [condition, setCondition] = useState();
  const [service, setService] = useState();
  const [dispo, setDispo] = useState();
  const [adresse, setAdresse] = useState();
  const [horaire, sethoraire] = useState();

  const handleMarkerPress = (item) => {

    if (animation._value === 1) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
      }).start();
    } else {
      
      setPresenatation(item.Description)
      setNom(item.Nom)
      setCondition(item.conditions)
      setService(item.services)
      setDispo(item.disponibilites)
      setAdresse(item.Adresse)
      sethoraire(item.horaires)

      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
      }).start();
    }

  };

  const animatedStyle = {
    transform: [
      {
          translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0],
        }),
      },
    ],
  };

  switch (ville) { 
    case "Amiens": currentCity = Amiens; latitude = 49.894067; longitude = 2.295753; break;
    case "Lille": currentCity = Lille; latitude = 50.637222; longitude = 3.063333; break;
    case "Arras": currentCity = Arras; latitude = 50.283333; longitude = 2.777778; break;
    case "Pas-De-Calais": currentCity = PasDeCalais; latitude = 50.716667; longitude = 1.633333; break;
    case "Beauvais": currentCity = Beauvais; latitude = 49.4333; longitude = 2.0833; break;
    case "Soissons": currentCity = Soissons; latitude = 49.383333; longitude = 3.333333; break;
    case "Abbeville": currentCity = Abbeville; latitude = 50.1033; longitude = 1.8333; break;
    case "Laon": currentCity = Laon; latitude = 49.566667; longitude = 3.633333; break;
    case "Dunkerque": currentCity = Dunkerque; latitude = 51.05; longitude = 2.366667; break;
    case "Roubaix": currentCity = Roubaix; latitude = 50.694444; longitude = 3.177778; break;
    case "Saint-Omer": currentCity = SaintOmer; latitude = 50.766667; longitude = 2.216667; break;
    case "Lens": currentCity = Lens; latitude = 50.43333; longitude = 2.8333; break;
    case "Chantilly": currentCity = Chantilly; latitude = 49.183333; longitude = 2.416667; break;
    case "Bethune": currentCity = Bethune; latitude = 50.53333; longitude = 2.6333; break;
    case "Noyon": currentCity = Noyon; latitude = 49.583333; longitude = 3.083333; break;
  }

  const filteredCity = currentCity.filter((item) => { 
    
    let match = true; 
      
      for (let i = 0; i < filtres.length; i++) { 
        if (!item.services.includes(filtres[i])) { 
          match = false; break; 
        } 
      } 
    return match; 

  });  

  return (
    
    <View style={{ flex: 1}}>
      
      <View style={styles.container}>

        <View>
          
          <MapView 
            style={styles.map}
            showsUserLocation={true}
            showsCompass = {false}
            mapPadding={{top:18, bottom:35}}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}
          >
          
            {filteredCity.map((item) => 
              <Marker
                key={item.Nom}
                coordinate={{ latitude : item.LatLong.latitude , longitude : item.LatLong.longitude }}  
                image={require('./../assets/images/pin.png')}
                onPress={ () => handleMarkerPress(item)}
              />
            )}

          </MapView>

         <Animated.View style={[styles.animatedSquare, animatedStyle]}>
          <ScrollView stickyHeaderIndices={[0]}>
            
            <View style={{backgroundColor: 'white', paddingBottom: 10}}><Text onPress={ () => setAnimation(new Animated.Value(0)), handleMarkerPress } style={{backgroundColor: '#D0D0D0', width: '35%', height: 10, marginTop: 10, alignSelf: 'center'}}> </Text></View>

            <Text style={{fontSize: 16, paddingLeft: 20, paddingTop: 30, fontFamily: 'NunitoSans-Bold', color: "#2D4664"}}>{nom}</Text>
            <Text style={{fontFamily: 'NunitoSans-Regular', textAlign: 'justify', paddingLeft: 20, paddingRight: 20}}>{presentation}</Text>
            <Text style={{fontSize: 16, paddingLeft: 20, fontFamily: 'NunitoSans-Bold', color: "#2D4664"}}>Conditions</Text>
            <Text style={{fontFamily: 'NunitoSans-Regular', textAlign: 'justify', paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>{condition}</Text>

            <Text style={{fontSize: 16, paddingLeft: 20, fontFamily: 'NunitoSans-Bold', color: "#2D4664"}}>Disponibilités</Text>
            <Text style={{fontFamily: 'NunitoSans-Regular', textAlign: 'justify', paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>{dispo}</Text>

            <Text style={{fontSize: 16, paddingLeft: 20, fontFamily: 'NunitoSans-Bold', color: "#2D4664"}}>Les services</Text>
            <Text style={{fontFamily: 'NunitoSans-Regular', textAlign: 'justify', paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>{service}</Text>

            <Text style={{fontSize: 16, paddingLeft: 20, fontFamily: 'NunitoSans-Bold', color: "#2D4664"}}>Adresse</Text>
            <Text style={{fontFamily: 'NunitoSans-Regular', textAlign: 'justify', paddingLeft: 20, paddingRight: 20, paddingTop: 20}}>{adresse}</Text>

             <Text style={{fontSize: 16, paddingLeft: 20, fontFamily: 'NunitoSans-Bold', paddingTop: 20, color: "#2D4664"}}>Horaires</Text>
            <Text style={{fontFamily: 'NunitoSans-Regular', textAlign: 'justify', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 60}}>{horaire}</Text>
            

          </ScrollView>
        </Animated.View>

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
            <Text style={{borderRadius: 15, backgroundColor: "#2D4664", padding: 5, fontFamily:'NunitoSans-Bold',  fontSize: 12, color: 'white', textAlign: 'center'}}>Bureaux en espace de coworking {ville} - {filteredCity.length} résultats</Text>
          </View>

          <View style={{flex: 1}}></View>

        </View>

        <SafeAreaView style={{position: 'absolute', bottom: 0, backgroundColor:'white', width: '100%'}}>
          
          <View style={{flexDirection: 'row', backgroundColor:'#3F6795', padding: 6}}>
          
            <Pressable onPress={() => navigation.navigate("HautsDeFrance")} style={{flex: 1}}>
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
  animatedSquare: {
    width: "100%",
    height: "50%",
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
});
