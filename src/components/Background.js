import { StyleSheet, View } from 'react-native';
import GoMenu from './GoMenu';

export default function Background({children}) {
  return (
    <View style={styles.image}>
      {/*<GoMenu />*/}
      {children}
    </View >
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
    width: '100%',
  },
});