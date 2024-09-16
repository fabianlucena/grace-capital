import ButtonIcon from './ButtonIcon';
import { _ } from '../libs/locale';
import filtersIcon from '../images/filters.png';

export default function FiltersButtonIcon({style, onPress}) {
  return (
    <ButtonIcon 
      onPress={onPress}
      alt={_`Filters`}
      style={style}
      source={filtersIcon}
    />
  );
}