import circuitData from "~~/generated/circuits.json";

type ABI_Parameter = {
  name: string;
  type: {
    kind: string;
  };
  visibility: "public" | "private";
};
type ABI_ParamWitnesses = any;
// What is this?
// "param_witnesses": {
//   "x": [
//     1
//   ],
//   "y": [
//     2
//   ]
// },
type ABI_ReturnWitness = any;
type ABI_ReturnType = any;
// perhaps this type is the same as type in ABI_Parameter
type ABI = {
  parameters: ABI_Parameter[];
  param_witnesses: ABI_ParamWitnesses;
  return_witnesses: ABI_ReturnWitness[];
  return_type: ABI_ReturnType;
};
type ACIR = number[];

export type GenericCircuitsDeclaration = {
  [name: string]: {
    circuit: ACIR;
    abi: ABI;
  };
};

export const circuits = circuitData || {};

export type CircuitName = keyof typeof circuits;

export type Circuits = typeof circuits;

export type Circuit<TCircuitName extends CircuitName> = Circuits[TCircuitName];

export enum CircuitCodeStatus {
  "FOUND",
  "NOT_FOUND",
}
