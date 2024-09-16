import { useState, useEffect } from 'react';
import { View, Pressable, Text, TextInput } from 'react-native';
import styles from '../libs/styles';
import LocaleText from '../components/LocaleText';
import Background from '../components/Background';
import Field from '../components/Field';
import getDependency from '../libs/dependency';
import DateInput from '../components/DateInput';

export default function PurposeScreen({navigation, route}) {
  const [purposesService, setPurposesService] = useState(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState(new Date);
  const [toDate, setToDate] = useState(new Date);

  useEffect(() => {
    setPurposesService(getDependency('purposesService'));
  }, []);

  useEffect(() => {
    setId(route?.params?.id);
  }, [route]);

  useEffect(() => {
    loadPurpose(id);
  }, [purposesService, id]);

  async function loadPurpose(id) {
    if (!purposesService || !id) {
      return;
    }

    const purpose = await purposesService.getSingleOrNullForId(id);
    if (purpose) {
      console.log(purpose);
      setTitle(purpose.title);
      setDescription(purpose.description);
      setFromDate(purpose.fromDate);
      setToDate(purpose.toDate);
    }
  }

  async function savePurpose() {
    const data = {
      title,
      description,
      fromDate,
      toDate,
    };
    if (id) {
      await purposesService.updateForId(id, data);
    } else {
      await purposesService.create(data);
    }

    navigation.goBack();
  }

  return (
    <Background>
      <View style={styles.container}>
        <LocaleText>{toDate?.toISOString().split('T')[0] ?? 'nulo'}</LocaleText>
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
            date={fromDate}
            onChangeText={setFromDate}
          />
        </Field>
        <Field>
          <LocaleText>To</LocaleText>
          <DateInput
            style={styles.input}
            mode="date"
            date={toDate}
            onChangeText={setToDate}
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
