import { Pressable } from 'react-native';
import styles from '../libs/styles';
import LocaleText from './LocaleText';

export default function LocaleButton({children, onPress, style}) {
  return (
    <Pressable style={{...styles.button, ...style}} onPress={onPress}  >
      <LocaleText style={styles.textButton}>{children}</LocaleText>
    </Pressable>
  );
}