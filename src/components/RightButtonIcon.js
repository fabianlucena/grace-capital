import ButtonIcon from './ButtonIcon';
import { _ } from '../libs/locale';
import rightIcon from '../images/right.png';

export default function RightButtonIcon({style, onPress}) {
  return (
    <ButtonIcon 
      onPress={onPress}
      alt={_`Right`}
      style={style}
      source={rightIcon}
    />
  );
}