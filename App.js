import '@expo/metro-runtime';
import {NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import _ from './src/libs/locale';
import LocaleText from './src/components/LocaleText';
import MenuScreen from './src/screens/MenuScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import CapitalaryScreen from './src/screens/CapitalaryScreen';
import PurposeScreen from './src/screens/PurposeScreen';
import PurposesScreen from './src/screens/PurposesScreen';

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
      <Stack.Navigator initialRouteName='Purposes'>
        <Stack.Screen name="Menu"        component={MenuScreen}       options={{             title: _`Menu` }}/>
        <Stack.Screen name="Calendar"    component={CalendarScreen}   options={{headerRight, title: _`Calendar` }}/>
        <Stack.Screen name="Capitalary"  component={CapitalaryScreen} options={{headerRight, title: _`Capitalary` }}/>
        <Stack.Screen name="Purposes"    component={PurposesScreen}   options={{headerRight, title: _`Purposes list` }}/>
        <Stack.Screen name="Purpose"     component={PurposeScreen}    options={{headerRight, title: _`Purpose` }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
