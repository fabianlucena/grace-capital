import { View } from 'react-native';
import styles from '../libs/styles';
import LocaleHeader from '../components/LocaleHeader';
import Background from '../components/Background';

export default function CapitalaryScreen({navigation}) {
  return (
    <Background>
      <View style={styles.container}>
        <LocaleHeader >Capitalary</LocaleHeader>
      </View>
    </Background>
  );
}
