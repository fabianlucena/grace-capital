import { Platform, Alert } from 'react-native';
import _ from './locale';

export function confirm({title = _`Confirm`, message = _`Do you want to confirm?`, onOk, onCancel}) {
  if (Platform.OS === 'web') {
    if (window.confirm(title, message)) {
      if (onOk) {
        onOk();
      }
    } else {
      if (onCancel) {
        onCancel();
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
      {
        text: _`Cancel`,
        onPress: onCancel,
      },
    ]
  );
}