import { useEffect, useState } from 'react';
import { View, FlatList, Text, Switch, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
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
import FiltersButtonIcon from '../components/FiltersButtonIcon';

export default function PurposesScreen({navigation}) {
  const isFocused = useIsFocused();
  const [purposesService, setPurposesService] = useState();
  const [date, setDate] = useState(new Date);
  const [purposes, setPurposes] = useState([]);
  const [isFiltered, setIsFiltered] = useState(true);

  useState(() => {
    date.setHours(0, 0, 0, 0);
    setDate(new Date(date));
    setPurposesService(getDependency('purposesService'));
  }, []);

  useEffect(() => {load()}, [isFocused, date, isFiltered]);

  async function load() {
    const filters = isFiltered? {
      fromDate: { [Op.ge]: date },
      [Op.or]: [
        {toDate: null},
        {toDate: {[Op.le]: date}},
      ],
    }: null;

    const purposes = await purposesService.getListFor(
      filters,
      {
        include: {
          accomplishments: {
            filters: { date },
          },
        },
      },
    );
    
    setPurposes(purposes);
  }

  function editForId(id) {
    navigation.navigate('Purpose', {id});
  }

  function deleteForId(id) {
    confirm({
      title: 'Confirma',
      message: 'Confirma la eliminación del propósito',
      onOk: async () => {
        await purposesService.deleteForId(id);
        load();
      },
    });
  }

  async function setIsCompletedForId(id, isCompleted) {
    await purposesService.updateForId(id, {isCompleted});
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
        <View style={{ ...styles.topBar }}>
          <LeftButtonIcon onPress={() => addDate(-1)} />
          <DateInput 
            date={date}
            onChange={(_, date) => setDate(date)}
          />
          <RightButtonIcon onPress={() => addDate(1)} />
          <FiltersButtonIcon style={isFiltered? { ...styles.presed }: null} onPress={() => setIsFiltered(!isFiltered)} />
        </View>
        <FlatList
          style={styles.list}
          data={purposes}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={{ flexGrow: 1 }}>{item.title}</Text>
              <Switch value={item.accomplishments.length} onValueChange={() => setIsCompletedForId(item.id, !item.isCompleted)}/>
              <EditButtonIcon onPress={() => editForId(item.id)} />
              <DeleteButtonIcon onPress={() => deleteForId(item.id)} />
            </View>
          )}
        />
      </View>
    </Background>
  );
}
