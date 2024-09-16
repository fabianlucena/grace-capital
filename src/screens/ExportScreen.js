import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import styles from '../libs/styles';
import Background from '../components/Background';
import getDependency from '../libs/dependency';

export default function ExportScreen() {
  const [content, setContent] = useState({});

  useState(() => {
    const data = {},
      optionsService = getDependency('optionsService');
    optionsService.getList()
      .then(options => {
        data.options = options;
        const purposesService = getDependency('purposesService')
        return purposesService.getList();
      })
      .then(purposes => {
        data.purposes = purposes;
        const accomplishmentsService = getDependency('accomplishmentsService')
        return accomplishmentsService.getList();
      })
      .then(accomplishments => {
        data.accomplishments = accomplishments;
        setContent(data);
      });
  }, []);

  return (
    <Background>
      <ScrollView >
        <Text>
          {JSON.stringify(content, null, '  ')}
        </Text>
      </ScrollView>
    </Background>
  );
}