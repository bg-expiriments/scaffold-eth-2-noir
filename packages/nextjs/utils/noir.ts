import circuitData from "~~/generated/circuits.json";

export type GenericCircuitsDeclaration = {
  [key: number]: string;
  // should include ABI
};

export const circuits = circuitData as GenericCircuitsDeclaration | null;

export type CircuitName = string;
