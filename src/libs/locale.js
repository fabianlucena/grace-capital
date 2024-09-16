import locale from './locale.es';

export class Locale {
  _(text) {
    if (typeof text !== 'string') {
      return text;
    }
    
    return locale?.translations[text.trim()] ?? text;
  }

  dateFormat(date, format) {
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

        case 'm': result += (date.getMonth() + 1).toString().padStart(2, '0'); break;
        case 'd': result += (date.getDate()).     toString().padStart(2, '0'); break;
        case 'Y': result += (date.getFullYear()). toString().padStart(4, '0'); break;
        case 'y': result += (date.getFullYear()). toString().substr(2); break;
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
