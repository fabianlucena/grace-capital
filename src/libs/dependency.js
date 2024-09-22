let dependencies = {};

export function addDependency(name, dependency) {
  /*if (dependencies[name]) {
    throw new Error(`Dependency ${name} already exists.`);
  }*/

  dependencies[name] = dependency;
}

export default function getDependency(name) {
  const dependency = dependencies[name];
  if (!dependency) {
    throw new Error('Dependency does not exist: ' + name);
  }

  return dependency;
}