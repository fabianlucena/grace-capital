import translations from './locale.es'

export class Locale {
  _(text) {
    if (typeof text !== 'string') {
      return text;
    }
    
    return translations[text.trim()] ?? text;
  }
}

export const loc = new Locale();

export function _(strings, ...args) {
  let text = loc._(strings.join('%s'));
  return text;
} 

export default _;