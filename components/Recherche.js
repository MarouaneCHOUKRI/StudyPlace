import { View, StyleSheet, Text, FlatList, TouchableHighlight } from 'react-native';
import { useState} from 'react';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { Switch, Searchbar, Button } from 'react-native-paper';

export default function App({navigation}) {
  
  const [fontsLoaded] = useFonts({
    'NunitoSans-Regular': require('./../assets/fonts/NunitoSans-Regular.ttf'),
    'NunitoSans-Light': require('./../assets/fonts/NunitoSans-Light.ttf'),
    'NunitoSans-Bold': require('./../assets/fonts/NunitoSans-Bold.ttf'),
  });

  const [switchStates, setSwitchStates] = useState([false, false, false, false, false, false,false, false, false, false, false, false, false, false])
  
  const switchLabels = ["Salles de réunion", "Salle de réflexion", "Animaux acceptés", "Bibliothèque", "Parkings à voitures", "Climatisation", "TV", "Impression 3D", "Imprimante / Scanner", "Vidéo projecteur","Ménage", "Phone Box", "Accès par badge", "Parkings à Scooter"];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [bbl, setBbl] = useState(15);
  const [bbr, setBbr] = useState(15);
  const citySuggestions = ['Amiens', 'Lille', 'Arras', 'Beauvais', 'Pas-De-Calais', 'Soissons', 'Abbeville', 'Laon', 'Dunkerque', 'Roubaix', 'Saint-Omer', 'Lens', 'Chantilly', 'Bethune', 'Noyon'];

  /*const renderCitySuggestion = ({item}) => 
  (
    <View style={{ position: "relative"}}>
      <View style={{ borderBottomColor: '#3F6795', borderBottomWidth: StyleSheet.hairlineWidth, }} />
      <TouchableHighlight  onPress={() => setSearchQuery(item)} underlayColor="#434C54">
        <Text style={{backgroundColor: '#2D4664', color: 'white', padding: 10, fontFamily: 'NunitoSans-Bold'}}>{item}</Text>
      </TouchableHighlight >
    </View>
  )*/

  {
    
  }
  
  const onChangeSearch = query => { 
    setSearchQuery(query);
  }
  
  
  const onToggleSwitch = (index) => {
      const newStates = [...switchStates];
      newStates[index] = !newStates[index];
      setSwitchStates(newStates);
  }

  const onPressButton = () => {

    const Filtres = [];
    switchStates.map( (value, index) => {
        if(value){
          Filtres.push(switchLabels[index])
        } 
      }
    )

    if(citySuggestions.includes(searchQuery.trim())){
      
      navigation.navigate("Ville", { filtres: Filtres, ville: searchQuery.trim(), })

    }else{
    
      alert("Désolé, la ville que vous avez entrée n'existe pas dans la région Hauts-de-France. Veuillez vérifier l'orthographe et réessayer")

    }

  }
  
  return (
    <View style={styles.container}>

      <View style={{backgroundColor: '#3F6795', paddingBottom: 20}}>
           
        <Searchbar
        placeholder="Rechercher une ville Hauts-de-France"
        onChangeText={onChangeSearch}
        placeholderTextColor='white'
        value={searchQuery}
        iconColor="white"
        inputStyle={{color: 'white', fontSize: 12.5, fontFamily: 'NunitoSans-Bold'}}
        style={{marginRight: 30, marginTop: 20, marginLeft: 30, backgroundColor : "#2D4664", borderBottomRightRadius: bbr, borderBottomLeftRadius: bbl, borderTopLeftRadius: 15, borderTopRightRadius: 15}}
        />
      </View>

      <View style={{paddingTop: 30, paddingLeft: 30, paddingBottom: 50}}>
        <Text style={{color: '#2D4664', fontFamily: 'NunitoSans-Regular', fontSize: 18}}>- Filtres -</Text>
      </View>

      
      <View style={{ flexDirection: "row"}}>
        
        <View style={{flex:1, paddingLeft: 30, paddingRight: 15}}>
          {switchStates.slice(0, switchStates.length/2).map((switchState, index) => (
            <View style={{ flexDirection: "row", paddingBottom: 10}} key={index}>
              <Text style={{fontFamily: 'NunitoSans-Light', fontSize: 14, flex: 1, alignSelf:'center'}}>{switchLabels[index]}</Text>
              <Switch
                value={switchState}
                onValueChange={() => onToggleSwitch(index)}
                color="#359AF6"
              />
            </View>
          ))}
        </View>

         <View style={{flex:1, paddingRight: 30, paddingLeft:15}}>
          {switchStates.slice(switchStates.length/2, switchStates.length).map((switchState, index) => (
            <View style={{ flexDirection: "row", paddingBottom: 10}} key={index+switchStates.length/2}>
              <Text style={{fontFamily: 'NunitoSans-Light', fontSize: 14, flex: 1,alignSelf:'center'}}>{switchLabels[index+switchStates.length/2]}</Text>
              <Switch
                value={switchState}
                onValueChange={() => onToggleSwitch(index+switchStates.length/2)}
                color="#359AF6"
              />
            </View>
          ))}
        </View>

      </View>
        
      <Button mode="contained" onPress={onPressButton} color="#359AF6" labelStyle={{color: 'white', fontSize: 14, fontFamily: 'NunitoSans-Regular'}} style={{marginLeft: 80,marginRight: 80, marginTop: 40, borderRadius: 15}}>
        Valider les filtres
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
});
