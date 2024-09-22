import { View } from 'react-native';
import styles from '../libs/styles';
import Background from '../components/Background';
import LocaleButton from '../components/LocaleButton';
import prayers from '../libs/prayers';

export default function PrayersScreen({navigation}) {
  return (
    <Background>
      <View style={styles.container}>
        {prayers.map(prayer => (
          <LocaleButton 
            key={prayer.name}
            onPress={() => navigation.navigate('Prayer', {prayer: prayer.name})}
          >
            {prayer.title}
          </LocaleButton>)    
        )}
      </View>
    </Background>
  );
}