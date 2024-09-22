import { View } from 'react-native';
import styles from '../libs/styles';
import Background from '../components/Background';
import LocaleText from '../components/LocaleText';
import { useEffect, useState } from 'react';
import { _, loc } from '../libs/locale';
import prayers from '../libs/prayers';

export default function PrayerScreen({route, navigation}) {
  const [prayerTitle, setPrayerTitle] = useState();
  const [prayerBody, setPrayerBody] = useState();

  useEffect(() => {
    const prayer = prayers.get(route.params.prayer);
    if (!prayer) {
      setPrayerBody(_`Error, prayer ${route.params.prayer} not found`);
      return;
    }
    setPrayerTitle(prayer.title);
    setPrayerBody(prayer.prayer);

    navigation.setOptions({ title: loc._(prayer.title) });
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