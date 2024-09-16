import { useState } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { dateFormat } from '../libs/locale';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput({date, mode = 'date', valueType = 'date', style, onChange}) {
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
    setIsSelectDateShowing(true);
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
    if (onChange) {
      if (mode === 'date') {
        date = getISOString(newDate);
      }

      date = newDate;
      onChange(event, date);
    }

    setIsSelectDateShowing(false);
  }
  
  function picker() {
    if (!isSelectDateShowing) {
      return;
    }

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
      <Text>{dateFormat(date, '%D')}</Text>
      {picker()}
    </Pressable>
  );
}