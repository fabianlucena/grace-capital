import locale from './locale.es';

export class Locale {
  _(text) {
    if (typeof text !== 'string') {
      return text;
    }
    
    return locale?.translations[text.trim()] ?? text;
  }

  dateFormat(date, format) {
    if (!date) {
      return '';
    }

    let result = '';

    for (let i = 0; i < format.length; i++) {
      let char = format[i];
      if (char !== '%') {
        result += char;
        continue;
      }

      i++;
      char = format[i];

      const sustitution = locale?.dateFormats['%' + char];
      if (sustitution) {
        format = format.substr(0, i + 1)
          + sustitution
          + format.substr(i + 1);

        continue;
      }

      switch (char) {
        case 'D':
          format = format.substr(0, i + 1)
            + '%m/%d/%y'
            + format.substr(i + 1);
        break;

        case 'F':
          format = format.substr(0, i + 1)
            + '%Y-%m-%d'
            + format.substr(i + 1);
        break;

        case 'T':
          format = format.substr(0, i + 1)
            + '%H-%M-%S'
            + format.substr(i + 1);
        break;

        case 'f': result += (date.getMilliseconds()).toString().padStart(3, '0'); break;
        case 'H': result += (date.getHours()).       toString().padStart(2, '0'); break;
        case 'M': result += (date.getMinutes()).     toString().padStart(2, '0'); break;
        case 'S': result += (date.getSeconds()).     toString().padStart(2, '0'); break;
        case 'd': result += (date.getDate()).        toString().padStart(2, '0'); break;
        case 'm': result += (date.getMonth() + 1).   toString().padStart(2, '0'); break;
        case 'Y': result += (date.getFullYear()).    toString().padStart(4, '0'); break;
        case 'y': result += (date.getFullYear()).    toString().substr(2); break;
        case 'z': 
          let diff = date.getTimezoneOffset();
          result += (diff < 0)? '-': '+'
            + (diff / 60).toString().padStart(2, '0') 
            + (diff % 60).toString().padStart(2, '0');
        break;
        
        default: result += char;
      }
    }

    return result;
  }
}

export const loc = new Locale();

export function _(strings, ...args) {
  let text = loc._(strings.join('%s'));
  return text;
} 

export function dateFormat(date, format) {
  let text = loc.dateFormat(date, format);
  return text;
} 
