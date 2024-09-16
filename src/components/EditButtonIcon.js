import ButtonIcon from './ButtonIcon';
import { _ } from '../libs/locale';
import editIcon from '../images/pencil.png';

export default function EditButtonIcon({style, onPress}) {
  return (
    <ButtonIcon 
      onPress={onPress}
      alt={_`Edit`}
      style={style}
      source={editIcon}
    />
  );
}