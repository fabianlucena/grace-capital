import { useEffect, useState } from 'react';
import { View, FlatList, Text, Switch } from 'react-native';
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
import FiltersButtonIcon from '../components/FilterButtonIcon';

export default function PurposesScreen({navigation}) {
  const todayDate = new Date;
  todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset());
  const today = todayDate.toISOString().split('T')[0];
  const isFocused = useIsFocused();
  const [purposesService, setPurposesService] = useState();
  const [date, setDate] = useState('');
  const [purposes, setPurposes] = useState([]);
  const [isFiltered, setIsFiltered] = useState(true);

  useState(() => {
    setDate(today);
    setPurposesService(getDependency('purposesService'));
  }, []);

  useEffect(() => {load()}, [isFocused, date, isFiltered]);

  async function load() {
    const filters = isFiltered? {
      fromDate: { [Op.le]: date },
      [Op.or]: [
        {toDate: null},
        {toDate: {[Op.ge]: date}},
      ],
    }: null;

    let purposes = await purposesService.getListFor(
      filters,
      {
        include: {
          accomplishments: {
            filters: {
              [Op.eq]: [
                {[Op.date]: {[Op.col]: 'date'}},
                date
              ],
            },
          },
        },
      },
    );

    purposes = purposes.map(purpose => ({...purpose, isCompleted: !!purpose.accomplishments?.length}));
    
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

  async function setIsCompletedForId(purpose) {
    if (purpose.isCompleted) {
      await purposesService.deleteAccomplishmentForIdAndDate(purpose.id, date);
    } else {
      await purposesService.addAccomplishmentForIdAndDate(purpose.id, new Date);
    }

    const isCompleted = !purpose.isCompleted;
    setPurposes(purposes.map(p => p.id == purpose.id? {...p, isCompleted}: p ));

    load();
  }

  function addDate(days) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate.toISOString().split('T')[0]);
  }

  return (
    <Background>
      <View style={{ ...styles.container }}>
        <AddButtonIcon style={{ ...styles.floatTopLeft, ...styles.gigaIcon }} onPress={() => navigation.navigate('Purpose')} />
        <View style={{ ...styles.topBar }}>
          <LeftButtonIcon onPress={() => addDate(-1)} />
          <DateInput 
            date={date}
            valueType="text"
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
              <Text style={{ flexGrow: 1 }}>{item.description}</Text>
              <Switch value={item.isCompleted} onValueChange={() => setIsCompletedForId(item)}/>
              <EditButtonIcon onPress={() => editForId(item.id)} />
              <DeleteButtonIcon onPress={() => deleteForId(item.id)} />
            </View>
          )}
        />
      </View>
    </Background>
  );
}
