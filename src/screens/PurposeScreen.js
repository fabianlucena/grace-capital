import { useState, useEffect } from 'react';
import { View } from 'react-native';
import styles from '../libs/styles';
import LocaleButton from '../components/LocaleButton';
import Background from '../components/Background';
import getDependency from '../libs/dependency';
import LocaleTextField from '../components/LocaleTextField';
import LocaleDateField from '../components/LocaleDateField';
import { alert } from '../libs/alert';
import { _ } from '../libs/locale';

export default function PurposeScreen({navigation, route}) {
  const today = (new Date).toISOString().split('T')[0];
  const [purposesService, setPurposesService] = useState(null);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(null);

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
      setTitle(purpose.title);
      setDescription(purpose.description);
      setFromDate(purpose.fromDate);
      setToDate(purpose.toDate);
    }
  }

  async function savePurpose() {
    if (!title) {
      alert({message: _`Purpose dos not have title`});

      return;
    }

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
        <LocaleTextField
          value={title}
          onChangeValue={setTitle}
        >
          Title
        </LocaleTextField>
        <LocaleTextField
          value={description}
          onChangeValue={setDescription}
        >
          Description
        </LocaleTextField>
        <LocaleDateField
          mode="date"
          valueType="text"
          value={fromDate}
          onChangeValue={setFromDate}
        >
          From
        </LocaleDateField>
        <LocaleDateField
          mode="date"
          valueType="text"
          value={toDate}
          onChangeValue={setToDate}
          nullable={true}
        >
          To
        </LocaleDateField>
        <LocaleButton onPress={savePurpose}  >{id? 'Update': 'Add'}</LocaleButton>
        <LocaleButton onPress={() => navigation.goBack()}  >Cancel</LocaleButton>
      </View>
    </Background>
  );
}
