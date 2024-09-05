import { View, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
