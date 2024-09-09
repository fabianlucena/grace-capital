import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateInput({style, date, onChange}) {
  return Platform.OS === 'web'?
    (
      <input
        style={style}
        type='date'
        value={date?.toISOString().split('T')[0] ?? ''}
        onChange={e => {
          if (onChange) {
            onChange(e, new Date(e.target.value))
          }
        }}
      />
    ): (
      <DateTimePicker
        style={style}
        mode='date'
        date={date}
        onChange={onChange}
      />
    );
}