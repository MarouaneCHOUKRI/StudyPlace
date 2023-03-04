import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Accueil from './components/Accueil'
import HautsDeFrance from './components/Hauts-de-France'
import Recherche from './components/Recherche'
import Information from './components/Information'
import Ville from './components/Ville'

const {Navigator, Screen} = createStackNavigator();
const options = { headerShown : false, transition: { name: 'slide' }};


export default function App() {

  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Accueil" component={Accueil} options={options}></Screen>
        <Screen name="HautsDeFrance" component={HautsDeFrance} options={options}></Screen>
        <Screen name="Recherche" component={Recherche} options={options}></Screen>
        <Screen name="Information" component={Information} options={options}></Screen>
        <Screen name="Ville" component={Ville} options={options}></Screen>
      </Navigator>
    </NavigationContainer>
  );
}

