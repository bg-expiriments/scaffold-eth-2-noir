import { CircuitName } from "~~/utils/noir/circuit";

// TODO: where should this live?
export type Proof = string;

let isRunning = false;
const circuitProofs: Partial<
  Record<
    CircuitName,
    {
      resultPromise: Promise<Proof>;
      result: Proof;
    }
  >
> = {};

const generateProofWrapper = (circuitName: CircuitName, parsedArgs?: any) => {
  console.log("generateProofWrapper", circuitName, parsedArgs);
  return async () => {
    if (isRunning) throw new Error("A proof generation already in progress");
    isRunning = true;
    const proofPromise = new Promise<Proof>(resolve => {
      setTimeout(() => {
        isRunning = false;
        const res = "I am a proof result for " + circuitName;
        circuitProofs[circuitName]!.result = res;
        console.log("proofPromise resolving");
        resolve(res);
      }, 2000);
    });
    circuitProofs[circuitName]!.resultPromise = proofPromise;
    return proofPromise;
  };
};

export default function useProofGenerator(circuitName: CircuitName, form: any) {
  if (!circuitProofs[circuitName]) {
    circuitProofs[circuitName] = {
      resultPromise: new Promise(r => r("hej")),
      result: "",
    };
  }
  return {
    result: circuitProofs[circuitName]!.result,
    isLoading: isRunning,
    generateProof: generateProofWrapper(circuitName, form),
  };
}
