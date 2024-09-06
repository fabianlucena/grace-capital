import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { loc } from '../libs/locale';

export default function LocaleText({style, children}) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(loc._(children) || '');
  }, [children])

  return (<Text style={style}>{text}</Text>);
}