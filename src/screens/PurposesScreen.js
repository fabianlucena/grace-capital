import { useEffect, useState } from 'react';
import { View, FlatList, Text, Switch } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import styles from '../libs/styles';
import { confirm } from '../libs/confirm';
import Background from '../components/Background';
import AddButtonIcon from '../components/AddButtonIcon';
import DeleteButtonIcon from '../components/DeleteButtonIcon';
import EditButtonIcon from '../components/EditButtonIcon';
import LeftButtonIcon from '../components/LeftButtonIcon';
import RightButtonIcon from '../components/RightButtonIcon';
import getDependency from '../libs/dependency';
import DateInput from '../components/DateInput';
import Op from '../libs/operators';

export default function PurposesScreen({navigation}) {
  const isFocused = useIsFocused();
  const [purposeService, setHurposeService] = useState();
  const [date, setDate] = useState(new Date);
  const [purposes, setPurposes] = useState([]);

  useState(() => {
    date.setHours(0, 0, 0, 0);
    setDate(new Date(date));
    setHurposeService(getDependency('purposeService'));
  }, []);

  useEffect(load, [isFocused, date]);

  function load() {
    purposeService.getListFor({
      from: { [Op.ge]: date },
      [Op.or]: [
        {to: null},
        {to: {[Op.le]: date}},
      ],
    })
      .then(setPurposes);
  }

  function editForId(id) {
    navigation.navigate('Purpose', {id});
  }

  function deleteForId(id) {
    confirm({
      title: 'Confirma',
      message: 'Confirma la eliminación del propósito',
      onOk: async () => {
        await purposeService.deleteForId(id);
        load();
      },
    });
  }

  async function setIsCompletedForId(id, isCompleted) {
    await purposeService.updateForId(id, {isCompleted});
    load();
  }

  function addDate(days) {
    date.setDate(date.getDate() + days);
    setDate(new Date(date));
  }

  return (
    <Background>
      <View style={{ ...styles.container }}>
        <AddButtonIcon style={{ ...styles.floatTopLeft, ...styles.gigaIcon }} onPress={() => navigation.navigate('Purpose')} />
        <LeftButtonIcon onPress={() => addDate(-1)} />
        <DateInput 
          date={date}
          onChange={(_, value) => setDate(value)}
        />
        <RightButtonIcon onPress={() => addDate(1)} />
        <FlatList
          style={styles.list}
          data={purposes}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={{ flexGrow: 1 }}>{item.title}</Text>
              <Switch value={item.isCompleted} onValueChange={() => setIsCompletedForId(item.id, !item.isCompleted)}/>
              <EditButtonIcon onPress={() => editForId(item.id)} />
              <DeleteButtonIcon onPress={() => deleteForId(item.id)} />
            </View>
          )}
        />
      </View>
    </Background>
  );
}
