import styles from '../libs/styles';
import LocaleText from '../components/LocaleText';

export default function LocaleLabel({children, style}) {
  return (<LocaleText style={{...styles.label, ...style}}>{children}</LocaleText>);
}