import '@expo/metro-runtime';
import {NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import _ from './src/libs/locale';
import MenuScreen from './src/screens/MenuScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import CapitalaryScreen from './src/screens/CapitalaryScreen';
import PurposeScreen from './src/screens/PurposeScreen';
import PurposesScreen from './src/screens/PurposesScreen';
import MenuButtonIcon from './src/components/MenuButtonIcon';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export default function App() {
  const headerRight = () => (
    <MenuButtonIcon onPress={() => navigationRef.isReady() && navigationRef.navigate('Menu')} />
  );

  useEffect(() => {
    navigationRef.isReady() && navigationRef.navigate('Purposes');
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator >
        <Stack.Screen name="Menu"        component={MenuScreen}       options={{             title: _`Menu` }}/>
        <Stack.Screen name="Purposes"    component={PurposesScreen}   options={{headerRight, title: _`Purposes list` }}/>
        <Stack.Screen name="Calendar"    component={CalendarScreen}   options={{headerRight, title: _`Calendar` }}/>
        <Stack.Screen name="Capitalary"  component={CapitalaryScreen} options={{headerRight, title: _`Capitalary` }}/>
        <Stack.Screen name="Purpose"     component={PurposeScreen}    options={{headerRight, title: _`Purpose` }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
