import ButtonIcon from './ButtonIcon';
import _ from '../libs/locale';
import menuIcon from '../images/menu.png';

export default function MenuButtonIcon({style, onPress}) {
  return (
    <ButtonIcon 
      onPress={onPress}
      alt={_`Menu`}
      style={style}
      source={menuIcon}
    />
  );
}