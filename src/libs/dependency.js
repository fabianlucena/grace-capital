import PurposeMockup from "../mockups/purpose_mockup";
import PurposeService from "../services/purpose";

export const dependencies = {
  purposeService: new PurposeService(new PurposeMockup()),
};

export default function getDependency(name) {
  const dependency = dependencies[name];
  if (!dependency) {
    throw new Error('Dependency does not exist: ' + name);
  }

  return dependency;
}