import {NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import _ from './libs/locale';
import MenuScreen from './screens/MenuScreen';
import CalendarScreen from './screens/CalendarScreen';
import CapitalaryScreen from './screens/CapitalaryScreen';
import { Pressable } from 'react-native';
import LocaleText from './components/LocaleText';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export default function App() {
  const headerRight = () => (
    <Pressable onPress={() => navigationRef.isReady() && navigationRef.navigate('Menu')}>
      <LocaleText>Menu</LocaleText>
    </Pressable>
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='Calendar'>
        <Stack.Screen name="Menu"       component={MenuScreen}       options={{             title: _`Menu` }}/>
        <Stack.Screen name="Calendar"   component={CalendarScreen}   options={{headerRight, title: _`Calendar` }}/>
        <Stack.Screen name="Capitalary" component={CapitalaryScreen} options={{headerRight, title: _`Capitalary` }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
