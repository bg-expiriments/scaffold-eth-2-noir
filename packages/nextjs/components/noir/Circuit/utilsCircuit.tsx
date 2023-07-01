import { CircuitAbiParameters, CircuitName } from "~~/utils/noir/circuit";

const getFunctionInputKey = (
  circuitName: CircuitName,
  input: CircuitAbiParameters[number],
  inputIndex: number,
): string => {
  const name = input.name || `input_${inputIndex}_`;
  return circuitName + "_" + name + "_" + input.type.kind + "_" + input.visibility;
};

const getInitialFormState = (circuitName: CircuitName, params: CircuitAbiParameters) => {
  const initialForm: Record<string, any> = {};
  params.forEach((p, index) => {
    const key = getFunctionInputKey(circuitName, p, index);
    initialForm[key] = "";
  });
  return initialForm;
};

// TODO: return-values
export { getInitialFormState, getFunctionInputKey };
