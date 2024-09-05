import { Pressable } from 'react-native';
import LocaleText from './LocaleText';

export default function GoMenu({navigation}) {
  return (
    <Pressable onPress={() => navigation.navigate('Menu')}><LocaleText>Menu</LocaleText></Pressable>
  );
}