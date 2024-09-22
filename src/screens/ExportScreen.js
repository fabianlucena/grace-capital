import { useState } from 'react';
import { View, ScrollView, Text, Share } from 'react-native';
import styles from '../libs/styles';
import Background from '../components/Background';
import getDependency from '../libs/dependency';
import LocaleButton from '../components/LocaleButton';
import { _ } from '../libs/locale';

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

  async function share() {
    try {
      await Share.share({
        title: _`Grace Capital personal data`,
        mesage: content,
        url: 'data://' + content,
        type: 'text/plain',
        subject: _`Grace Capital personal data`, //  for email
      });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        {/*<LocaleButton onPress={share}>Share</LocaleButton>*/}
        <ScrollView >
          <Text>
            {JSON.stringify(content, null, '  ')}
          </Text>
        </ScrollView>
      </View>
    </Background>
  );
}