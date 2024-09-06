import { useState } from 'react';
import { View, Pressable, Text, TextInput } from 'react-native';
import styles from '../libs/styles';
import LocaleText from '../components/LocaleText';
import Background from '../components/Background';
import Field from '../components/Field';
import getDependency from '../libs/dependency';

const purposeService = getDependency('purposeService');

export default function PurposeScreen({navigation, route}) {
  const [title, setTitle] = useState('');
  const [uuid, setUuid] = useState('');

  useState(() => {
    const uuid = route?.params?.uuid;
    setUuid(uuid);
    if (!uuid) {
      return;
    }

    loadPurpose(uuid);
  }, [route]);

  async function loadPurpose(uuid) {
    const purpose = await purposeService.getSingleOrNullForUuid(uuid);
    if (purpose) {
      setTitle(purpose.title);
    }
  }

  async function addPurpuose() {
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
        <Pressable style={styles.button} onPress={addPurpuose}  >
          <LocaleText>{uuid? 'Update': 'Add'}</LocaleText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}  >
          <LocaleText>Cancel</LocaleText>
        </Pressable>
      </View>
    </Background>
  );
}
