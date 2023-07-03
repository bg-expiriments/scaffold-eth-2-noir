import initialiseAztecBackend from "@noir-lang/aztec_backend";
import { create_proof, setup_generic_prover_and_verifier } from "@noir-lang/barretenberg";
import { initialiseResolver } from "@noir-lang/noir-source-resolver";
import initNoirWasm, { acir_read_bytes, compile } from "@noir-lang/noir_wasm";
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

function fileResolverCallback(id: string) {
  console.log("🤓 trying to read circuit: ", id);
  return "fn is_not_equal(x : Field, y : Field) -> bool {\n    x != y\n}\n\nfn main(x : Field, y : pub Field) {\n    assert(is_not_equal(x, y));\n}\n\n#[test]\nfn test_main() {\n    main(1, 2);\n    main(2, 1);\n    // TODO: is there a way to test that main fails without actually having it return a bool?\n}\n\n#[test]\nfn test_is_not_equal() {\n    let res2 = is_not_equal(1, 1);\n    assert(res2 == false);\n}\n";
}

const generateProof = async (circuitName: CircuitName, parsedArgs?: any) => {
  if (!isInitialised) {
    await initNoirWasm();
    initialiseResolver(fileResolverCallback);
    isInitialised = true;
  }
  const rez = await compile({});
  console.log("🤓 rez: ", new Uint8Array(Buffer.from(rez.circuit, "hex")));
  await initialiseAztecBackend();
  const acir_ints = new Uint8Array(circuits[circuitName].circuit);
  // ERROR: reading bytes fail
  const acir = acir_read_bytes(acir_ints);
  const [prover] = await setup_generic_prover_and_verifier(acir);
  const proof = await create_proof(prover, acir, parsedArgs);
  return JSON.stringify(proof, null, 2);
};

const generateProofWrapper = (circuitName: CircuitName, form: Record<string, any>) => {
  return async () => {
    if (isRunning) throw new Error("A proof generation already in progress");
    isRunning = true;
    const proofPromise = generateProof(circuitName, parseForm(form))
      .then(res => {
        isRunning = false;
        circuitProofs[circuitName]!.result = res;
        return "done with length: " + res.length;
      })
      .catch(err => {
        console.log("🤓 err: ", err);
        isRunning = false;
        throw err;
      });
    circuitProofs[circuitName]!.resultPromise = proofPromise;
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
    isLoading: isRunning,
    generateProof: generateProofWrapper(circuitName, form),
  };
}
