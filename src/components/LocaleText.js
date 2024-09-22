import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import styles from '../libs/styles';
import { loc } from '../libs/locale';
import localeEs from '../libs/locale.es';

export default function LocaleText({children, style}) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(loc._(children) || '');
  }, [children])

  return (<Text style={{...styles.text, ...style}}>{text}</Text>);
}