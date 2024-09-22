const prayers = [
  {
    name: 'Little Consecration',
    title: 'Little Consecration',
    prayer: Symbol('Little Consecration'),
  },
  {
    name: 'Our Father',
    title: 'Our Father',
    prayer: Symbol('Our Father'),
  }
];

prayers.get = name => prayers.find(p => p.name === name);

export default prayers;
