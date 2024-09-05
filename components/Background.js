import { StyleSheet, ImageBackground } from 'react-native';
import GoMenu from './GoMenu';

export default function Background({children}) {
  return (
    <ImageBackground style={styles.image}>
      <GoMenu />
      {children}
    </ImageBackground >
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