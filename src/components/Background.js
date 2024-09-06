import { View } from 'react-native';
import styles from '../libs/styles';
import GoMenu from './GoMenu';

export default function Background({children}) {
  return (
    <View style={styles.background}>
      {/*<GoMenu />*/}
      {children}
    </View >
  );
}
