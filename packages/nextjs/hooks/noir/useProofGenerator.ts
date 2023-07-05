import { CircuitName } from "~~/utils/noir/circuit";

const generateProof = async (circuitName: CircuitName, parsedArgs?: any) => {
  return fetch(`/api/proofs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ circuitName, parsedArgs }),
  });
};

const generateProofWrapper = (circuitName: CircuitName, form: Record<string, any>) => {
  return async () => {
    const res = await generateProof(circuitName, parseForm(form));
    return res.json();
  };
};

const parseForm = (form: Record<string, any>) => {
  const parameterObj: Record<string, any> = {};
  for (const [key, value] of Object.entries(form)) {
    const [, k] = key.split("_");
    parameterObj[k] = JSON.parse(value);
  }
  return parameterObj;
};

export default function useProofGenerator(circuitName: CircuitName, form: Record<string, any>) {
  return {
    isLoading: false,
    generateProof: generateProofWrapper(circuitName, form),
  };
}
