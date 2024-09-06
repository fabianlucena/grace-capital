import ButtonIcon from './ButtonIcon';
import _ from '../libs/locale';
import deleteIcon from '../images/trash.png';

export default function DeleteButtonIcon({style, onPress}) {
  return (
    <ButtonIcon 
      onPress={onPress}
      alt={_`Delete`}
      style={style}
      source={deleteIcon}
    />
  );
}