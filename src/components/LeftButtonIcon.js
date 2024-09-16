import ButtonIcon from './ButtonIcon';
import { _ } from '../libs/locale';
import leftIcon from '../images/left.png';

export default function LeftButtonIcon({style, onPress}) {
  return (
    <ButtonIcon 
      onPress={onPress}
      alt={_`Left`}
      style={style}
      source={leftIcon}
    />
  );
}