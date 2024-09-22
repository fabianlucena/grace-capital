const prayers = [
  {
    name: 'Our Father',
    title: 'Our Father',
    prayer: Symbol('Our Father'),
  },
  {
    name: 'Glory Be to the Father',
    title: 'Glory Be to the Father',
    prayer: Symbol('Glory Be to the Father'),
  },
  {
    name: 'Hail Mary',
    title: 'Hail Mary',
    prayer: Symbol('Hail Mary',),
  },
  {
    name: 'Little Consecration',
    title: 'Little Consecration',
    prayer: Symbol('Little Consecration'),
  },
  {
    name: 'Holy Rosary misteries',
    title: 'Holy Rosary misteries',
    prayer: Symbol('Holy Rosary misteries'),
  },
];

prayers.get = name => prayers.find(p => p.name === name);

export default prayers;
