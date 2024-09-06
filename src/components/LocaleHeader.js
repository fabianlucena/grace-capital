import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { loc } from '../libs/locale';
import styles from '../libs/styles';

export default function LocaleText({style, children}) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(loc._(children) || '');
  }, [children])

  return (<Text style={{ ...styles.header, ...style}}>{text}</Text>);
}