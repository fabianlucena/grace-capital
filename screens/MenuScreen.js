import { View, StyleSheet, Pressable } from 'react-native';
import LocaleText from '../components/LocaleText';
import Background from '../components/Background';

export default function MenuScreen({navigation}) {
  return (
    <Background>
      <View style={styles.container}>
        <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Calendar')}><LocaleText>Calendar</LocaleText></Pressable>
        <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Capitalary')}><LocaleText>Capitalary</LocaleText></Pressable>
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

  menuItem: {
    backgroundColor: '#c0c0c0',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#606060',
    padding: 3,
    paddingHorizontal: 5,
    margin: 5,
  },
});
