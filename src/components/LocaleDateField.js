import { useEffect, useState } from 'react';
import { View, Switch } from 'react-native';
import styles from '../libs/styles';
import DateInput from './DateInput';
import LocaleLabel from './LocaleLabel';
import Field from './Field';

export default function LocaleDateField({
  children,
  value,
  onChangeValue,
  mode = 'date',
  valueType = 'text',
  nullable = false,
  style,
  inputStyle,
  labelStyle
}) {
  const [isNull, setIsNull] = useState(false);
  const [localValue, setLocalValue] = useState(null);

  useEffect(() => {
    if (value) {
      setLocalValue(value);
      setIsNull(false);
    } else {
      setLocalValue(new Date);
      setIsNull(true);
    }
  }, [value]);

  function setNull(newIsNull) {
    setIsNull(newIsNull);
    fireOnChangeValue(localValue, newIsNull);
  }

  function onChangeHandler(evt, newValue) {
    setLocalValue(newValue);
    fireOnChangeValue(localValue, null);
  }

  function fireOnChangeValue(value, isNull) {
    if (!onChangeValue) {
      return;
    }

    if (isNull) {
      onChangeValue(null);
    } else {
      onChangeValue(value);
    }
  }

  return (
    <Field style={style}>
      <View style={styles.sameLine}>
        <LocaleLabel tyle={labelStyle}>{children}</LocaleLabel>
        {nullable? (
          <Switch value={!isNull} onValueChange={() => setNull(!isNull)} />
        ): null}
      </View>
      <DateInput
        style={{...styles.input, ...(isNull? styles.disabled: null), ...inputStyle}}
        mode={mode}
        valueType={valueType}
        date={localValue}
        onChange={onChangeHandler}
        disable={isNull}
      />
    </Field>
  );
}