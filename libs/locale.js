export class Locale {
  _(text) {
    switch (text) {
      case 'Calendar':   return 'Calendario';
      case 'Capitalary': return 'Capitalario';
      case 'Menu':       return 'Menú';
    }

    return text;
  }
}

export const loc = new Locale();

export function _(strings, ...args) {
  let text = loc._(strings.join('%s'));
  return text;
} 

export default _;