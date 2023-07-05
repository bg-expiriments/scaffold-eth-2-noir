//import useSWR from 'swr'
//const { data, error, isLoading } = useSWR<Proof[]>('/api/proofs', fetcher)
import type { Proof } from "~~/interfaces";
import { CircuitName } from "~~/utils/noir/circuit";

const circuitProofs: Partial<
  Record<
    CircuitName,
    {
      resultPromise: Promise<Proof>;
      result: Proof;
    }
  >
> = {};

//const fetcher = (url: string) => fetch(url).then((res) => res.json())

const generateProof = async (circuitName: CircuitName, parsedArgs?: any) => {
  return fetch(`/api/proofs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ circuitName, parsedArgs }),
  });
};

const generateProofWrapper = (circuitName: CircuitName, form: Record<string, any>) => {
  return async () => {
    const proofPromise = generateProof(circuitName, parseForm(form));
    return proofPromise;
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
  if (circuitProofs[circuitName] === undefined) {
    circuitProofs[circuitName] = {
      resultPromise: new Promise(r => r("hej")),
      result: "",
    };
  }
  return {
    result: circuitProofs[circuitName]!.result,
    isLoading: false,
    generateProof: generateProofWrapper(circuitName, form),
  };
}
