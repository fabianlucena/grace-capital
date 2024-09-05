import { Text } from 'react-native';
import { loc } from '../libs/locale';

export default function LocaleText({children}) {
  return (
    <Text>{loc._(children)}</Text>
  );
}