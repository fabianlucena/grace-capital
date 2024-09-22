import { View } from 'react-native';
import styles from '../libs/styles';
import Background from '../components/Background';
import LocaleButton from '../components/LocaleButton';

export default function PrayersScreen({navigation}) {
  return (
    <Background>
      <View style={styles.container}>
        <LocaleButton onPress={() => navigation.navigate('Prayer', {prayer: 'littleConsecration'})}    >Little consecration</LocaleButton>
      </View>
    </Background>
  );
}