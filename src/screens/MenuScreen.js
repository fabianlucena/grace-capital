import { View } from 'react-native';
import styles from '../libs/styles';
import Background from '../components/Background';
import LocaleButton from '../components/LocaleButton';

export default function MenuScreen({navigation}) {
  return (
    <Background>
      <View style={styles.container}>
        {/*<LocaleButton style={styles.button} onPress={() => navigation.navigate('Calendar')}  >Calendar  </LocaleButton>*/}
        <LocaleButton onPress={() => navigation.navigate('Purposes')}  >Purposes  </LocaleButton>
        {/*<LocaleButton style={styles.button} onPress={() => navigation.navigate('Capitalary')}>Capitalary<LocaleButton>*/}
        <LocaleButton style={styles.button} onPress={() => navigation.navigate('Export')}    >Export</LocaleButton>
        <LocaleButton style={styles.button} onPress={() => navigation.navigate('Prayers')}   >Prayers</LocaleButton>
      </View>
    </Background>
  );
}