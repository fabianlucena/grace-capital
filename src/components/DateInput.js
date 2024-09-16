import { useState } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { dateFormat } from '../libs/locale';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput({style, date, onChange}) {
  const [isSelectDateShowing, setIsSelectDateShowing] = useState(false);

  function selectDate() {
    setIsSelectDateShowing(true);
  }
  
  function picker() {
    if (!isSelectDateShowing) {
      return;
    }

    return Platform.OS === 'web'?
    (
      <input
        style={style}
        type='date'
        value={date?.toISOString().split('T')[0] ?? ''}
        onChange={e => {
          if (onChange) {
            onChange(e, new Date(e.target.value + 'T00:00:00'))
          }

          setIsSelectDateShowing(false);
        }}
      />
    ): (
      <DateTimePicker
        style={style}
        mode='date'
        value={date}
        onChange={onChange}
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