import ButtonIcon from './ButtonIcon';
import _ from '../libs/locale';
import addIcon from '../images/add.svg';

export default function AddButtonIcon({style, onPress}) {
  return (
    <ButtonIcon 
      onPress={onPress}
      alt={_`Add`}
      style={style}
      source={addIcon}
    />
  );
}