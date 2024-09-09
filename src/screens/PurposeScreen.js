import { useState, useEffect } from 'react';
import { View, Pressable, Text, TextInput } from 'react-native';
import styles from '../libs/styles';
import LocaleText from '../components/LocaleText';
import Background from '../components/Background';
import Field from '../components/Field';
import getDependency from '../libs/dependency';
import DateInput from '../components/DateInput';

export default function PurposeScreen({navigation, route}) {
  const [purposeService, setPurposeService] = useState(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState(new Date);
  const [to, setTo] = useState(new Date);

  useEffect(() => {
    setPurposeService(getDependency('purposeService'));
  }, []);

  useEffect(() => {
    setId(route?.params?.id);
  }, [route]);

  useEffect(() => {
    loadPurpose(id);
  }, [purposeService, id]);

  async function loadPurpose(id) {
    if (!purposeService || !id) {
      return;
    }

    const purpose = await purposeService.getSingleOrNullForId(id);
    if (purpose) {
      console.log(purpose);
      setTitle(purpose.title);
      setDescription(purpose.description);
      setFrom(purpose.from);
      setTo(purpose.to);
    }
  }

  async function savePurpose() {
    const data = {
      title,
      description,
      from,
      to,
    };
    if (id) {
      await purposeService.updateForId(id, data);
    } else {
      await purposeService.create(data);
    }

    navigation.goBack();
  }

  return (
    <Background>
      <View style={styles.container}>
        <LocaleText>{to?.toISOString().split('T')[0] ?? 'nulo'}</LocaleText>
        <Field>
          <LocaleText>Title</LocaleText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </Field>
        <Field>
          <LocaleText>Description</LocaleText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </Field>
        <Field>
          <LocaleText>From</LocaleText>
          <DateInput
            style={styles.input}
            mode="date"
            date={from}
            onChangeText={setFrom}
          />
        </Field>
        <Field>
          <LocaleText>To</LocaleText>
          <DateInput
            style={styles.input}
            mode="date"
            date={to}
            onChangeText={setTo}
          />
        </Field>
        <Pressable style={styles.button} onPress={savePurpose}  >
          <LocaleText>{id? 'Update': 'Add'}</LocaleText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}  >
          <LocaleText>Cancel</LocaleText>
        </Pressable>
      </View>
    </Background>
  );
}
