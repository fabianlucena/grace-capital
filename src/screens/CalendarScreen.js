import { View, Pressable } from 'react-native';
import styles from '../libs/styles';
import LocaleText from '../components/LocaleText';
import Background from '../components/Background';

export default function CalendarScreen({navigation}) {
  return (
    <Background>
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Purpose')}><LocaleText>+</LocaleText></Pressable>
        <LocaleText>Calendar</LocaleText>
      </View>
    </Background>
  );
}
