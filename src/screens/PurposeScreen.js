import { useState, useEffect } from 'react';
import { View, Pressable, Text, TextInput } from 'react-native';
import styles from '../libs/styles';
import LocaleText from '../components/LocaleText';
import Background from '../components/Background';
import Field from '../components/Field';
import getDependency from '../libs/dependency';

export default function PurposeScreen({navigation, route}) {
  const [title, setTitle] = useState('');
  const [uuid, setUuid] = useState('');
  const [purposeService, setPurposeService] = useState(null);

  useEffect(() => {
    setPurposeService(getDependency('purposeService'));
  }, []);

  useEffect(() => {
    setUuid(route?.params?.uuid);
  }, [route]);

  useEffect(() => {
    loadPurpose(uuid);
  }, [purposeService, uuid]);

  async function loadPurpose(uuid) {
    if (!purposeService || !uuid) {
      return;
    }

    const purpose = await purposeService.getSingleOrNullForUuid(uuid);
    if (purpose) {
      setTitle(purpose.title);
    }
  }

  async function savePurpose() {
    if (uuid) {
      await purposeService.updateForUuid(uuid, {title});
    } else {
      await purposeService.create({title});
    }

    navigation.goBack();
  }

  return (
    <Background>
      <View style={styles.container}>
        <Field>
          <LocaleText>Description</LocaleText>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
          />
        </Field>
        <Pressable style={styles.button} onPress={savePurpose}  >
          <LocaleText>{uuid? 'Update': 'Add'}</LocaleText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}  >
          <LocaleText>Cancel</LocaleText>
        </Pressable>
      </View>
    </Background>
  );
}
