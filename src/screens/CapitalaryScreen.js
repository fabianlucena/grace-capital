import { View } from 'react-native';
import styles from '../libs/styles';
import LocaleText from '../components/LocaleText';
import Background from '../components/Background';

export default function CapitalaryScreen({navigation}) {
  return (
    <Background>
      <View style={styles.container}>
        <LocaleText>Capitalary</LocaleText>
      </View>
    </Background>
  );
}
