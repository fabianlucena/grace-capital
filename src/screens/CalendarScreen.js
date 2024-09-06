import { View, Pressable } from 'react-native';
import styles from '../libs/styles';
import LocaleHeader from '../components/LocaleHeader';
import Background from '../components/Background';

export default function CalendarScreen({navigation}) {
  return (
    <Background>
      <View style={styles.container}>
        <LocaleHeader >Calendar</LocaleHeader>
      </View>
    </Background>
  );
}
