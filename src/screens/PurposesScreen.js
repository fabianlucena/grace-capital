import { useEffect, useState } from 'react';
import { View, FlatList, Text, Switch } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import styles from '../libs/styles';
import { confirm } from '../libs/confirm';
import LocaleText from '../components/LocaleText';
import Background from '../components/Background';
import PurposeService from '../services/purpose';
import AddButtonIcon from '../components/AddButtonIcon';
import DeleteButtonIcon from '../components/DeleteButtonIcon';
import EditButtonIcon from '../components/EditButtonIcon';

export default function PurposesScreen({navigation}) {
  const [purposes, setPurposes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(load, [isFocused]);

  function load() {
    PurposeService.getList()
      .then(setPurposes);
  }

  function editForUuid(uuid) {
    navigation.navigate('Purpose', {uuid});
  }

  function deleteForUuid(uuid) {
    confirm({
      title: 'Confirma',
      message: 'Confirma la eliminación del propósito',
      onOk: async () => {
        await PurposeService.deleteForUuid(uuid);
        load();
      },
    });
  }

  async function setIsCompletedForUuid(uuid, isCompleted) {
    await PurposeService.updateForUuid(uuid, {isCompleted});
    load();
  }

  return (
    <Background>
      <View style={{ ...styles.container }}>
        <AddButtonIcon style={{ ...styles.floatTopLeft, ...styles.gigaIcon }} onPress={() => navigation.navigate('Purpose')} />
        <LocaleText>Purposes</LocaleText>
        <FlatList
          style={styles.list}
          data={purposes}
          keyExtractor={item => item.uuid}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={{ flexGrow: 1 }}>{item.title}</Text>
              <Switch value={item.isCompleted} onValueChange={() => setIsCompletedForUuid(item.uuid, !item.isCompleted)}/>
              <EditButtonIcon onPress={() => editForUuid(item.uuid)} />
              <DeleteButtonIcon onPress={() => deleteForUuid(item.uuid)} />
            </View>
          )}
        />
      </View>
    </Background>
  );
}
