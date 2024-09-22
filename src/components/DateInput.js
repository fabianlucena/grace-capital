import { useState } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { dateFormat } from '../libs/locale';
import styles from '../libs/styles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput({date, mode = 'date', valueType = 'date', style, onChange, disabled}) {
  const [isSelectDateShowing, setIsSelectDateShowing] = useState(false);

  mode = mode.toLowerCase();
  if (mode !== 'date') {
    mode = 'date';
  }

  valueType = valueType.toLowerCase();
  if (valueType !== 'text') {
    valueType = 'date';
  }

  if (!(date instanceof Date)) {
    date = getDate(date);
  }

  function selectDate() {
    setIsSelectDateShowing((!disabled) && true);
  }

  function getISOString(date) {
    if (mode === 'date') {
      if (typeof date === 'string') {
        return date.split('T')[0];
      }

      return date.toISOString().split('T')[0];
    }
  }

  function getDate(date) {
    if (!date) {
      return;
    }

    if (mode === 'date') {
      if (typeof date === 'string') {
        date = date.split('T')[0];
        const tz = (new Date).getTimezoneOffset();
        date += `T${(tz / 60).toString().padStart(2, '0')}:${(tz % 60).toString().padStart(2, '0')}:00.000Z`;
        
        return new Date(date);
      }

      return date.toISOString().split('T')[0];
    }
  }

  function onChangeHandler(event, newDate) {
    setIsSelectDateShowing(false);
    if (onChange) {
      if (mode === 'date') {
        date = getISOString(newDate);
      }

      date = newDate;
      onChange(event, date);
    }
  }
  
  function picker() {
    if (!isSelectDateShowing) {
      return;
    }

    console.log(style);

    return Platform.OS === 'web'?
    (
      <input
        style={style}
        type={mode}
        value={getISOString(date)}
        onChange={event => onChangeHandler(event, event.target.value)}
      />
    ): (
      <DateTimePicker
        style={style}
        mode={mode}
        value={date}
        onChange={onChangeHandler}
      />
    );
  }

  return (
    <Pressable
      onPress={selectDate}
    >
      <Text style={{...styles.input, ...styles.text, ...style}}>{dateFormat(date, '%D')}</Text>
      {picker()}
    </Pressable>
  );
}