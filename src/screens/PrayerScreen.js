import { View } from 'react-native';
import styles from '../libs/styles';
import Background from '../components/Background';
import LocaleText from '../components/LocaleText';
import { useEffect, useState } from 'react';
import { _ } from '../libs/locale';

export default function PrayerScreen({route, navigation}) {
  const [prayerTitle, setPrayerTitle] = useState();
  const [prayerBody, setPrayerBody] = useState();

  useEffect(() => {
    const {prayer} = route.params;
    switch (prayer) {
      case 'littleConsecration':
        setPrayerTitle('Little consecration');
        setPrayerBody('_littleConsecration');

        navigation.setOptions({ title: _`Little consecration` });
      break;
    }
  }, [route]);

  return (
    <Background>
      <View style={styles.container}>
        <LocaleText>{prayerTitle}</LocaleText>
        <LocaleText>{prayerBody}</LocaleText>
      </View>
    </Background>
  );
}