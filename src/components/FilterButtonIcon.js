import ButtonIcon from './ButtonIcon';
import { _ } from '../libs/locale';
import filtersIcon from '../images/filter.png';

export default function FilterButtonIcon({style, onPress}) {
  return (
    <ButtonIcon 
      onPress={onPress}
      alt={_`Filters`}
      style={style}
      source={filtersIcon}
    />
  );
}