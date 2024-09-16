import { View } from 'react-native';
import styles from '../libs/styles';

export default function Field({children, style}) {
  return (
    <View style={style}>
      {children}
    </View>
  );
}