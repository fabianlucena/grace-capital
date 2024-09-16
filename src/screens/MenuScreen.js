import { View, Pressable } from 'react-native';
import styles from '../libs/styles';
import LocaleText from '../components/LocaleText';
import Background from '../components/Background';

export default function MenuScreen({navigation}) {
  return (
    <Background>
      <View style={styles.container}>
        {/*<Pressable style={styles.button} onPress={() => navigation.navigate('Calendar')}  ><LocaleText>Calendar  </LocaleText></Pressable>*/}
        <Pressable style={styles.button} onPress={() => navigation.navigate('Purposes')}  ><LocaleText>Purposes  </LocaleText></Pressable>
        {/*<Pressable style={styles.button} onPress={() => navigation.navigate('Capitalary')}><LocaleText>Capitalary</LocaleText></Pressable>*/}
        <Pressable style={styles.button} onPress={() => navigation.navigate('Export')}    ><LocaleText>Export    </LocaleText></Pressable>
      </View>
    </Background>
  );
}