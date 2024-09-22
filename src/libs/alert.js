import { Platform, Alert } from 'react-native';
import { _ } from './locale';

export function alert({title = _`Alert`, message, onOk}) {
  if (Platform.OS === 'web') {
    console.log(message);
    if (window.alert(message, title)) {
      if (onOk) {
        onOk();
      }
    }
  }

  return Alert.alert(
    title,
    message,
    [
      {
        text: _`Ok`,
        onPress: onOk,
      },
    ]
  );
}