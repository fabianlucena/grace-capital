import { Pressable, Image } from 'react-native';
import styles from '../libs/styles';

export default function ButtonIcon({style, onPress, alt, source}) {
  return (
    <Pressable 
      onPress={onPress}
      style={{...style}}
    >
      <Image
        alt={alt}
        style={{ ...styles.icon, ...styles.mediumIcon, ...style }}
        source={source}
      />
    </Pressable>
  );
}