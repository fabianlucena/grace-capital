function f(code) {
  return {[Op.func]: code};
}

const Op = {
  col:  Symbol('col'),
  
  eq:   Symbol('eq'),
  and:  Symbol('and'),
  or:   Symbol('or'),
  ge:   Symbol('ge'),
  le:   Symbol('le'),

  func: Symbol('func'),

  date: Symbol('date'),
};

export default Op;