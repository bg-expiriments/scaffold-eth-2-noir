import initialiseAztecBackend from "@noir-lang/aztec_backend";
import initNoirWasm, { acir_read_bytes } from "@noir-lang/noir_wasm";
import { CircuitName, circuits } from "~~/utils/noir/circuit";

// TODO: where should this live?
export type Proof = string;

let isInitialised = false;
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAcir = async (circuitName: CircuitName) => {
  if (!isInitialised) {
    await initNoirWasm();
    await initialiseAztecBackend();
    isInitialised = true;
  }
  const acir_ints = circuits[circuitName].circuit;
  return acir_read_bytes(acir_ints);
};

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
  if (circuitProofs[circuitName] === undefined) {
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
