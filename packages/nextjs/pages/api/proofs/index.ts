import {NextApiRequest, NextApiResponse} from "next";
// import initialiseAztecBackend from "@noir-lang/aztec_backend";
// import { create_proof, setup_generic_prover_and_verifier } from "@noir-lang/barretenberg";
// import { initialiseResolver } from "@noir-lang/noir-source-resolver";
// import initNoirWasm, { acir_read_bytes, compile } from "@noir-lang/noir_wasm";
// import { CircuitName, circuits } from "~~/utils/noir/circuit";
//
// // TODO: where should this live?
// export type Proof = string;
//
// let isInitialised = false;
// let isRunning = false;
// const circuitProofs: Partial<
//   Record<
//     CircuitName,
//     {
//       resultPromise: Promise<Proof>;
//       result: Proof;
//     }
//   >
// > = {};
//
// const generateProof = async (circuitName: CircuitName, parsedArgs?: any) => {
//   if (!isInitialised) {
//     await initNoirWasm();
//     initialiseResolver(fileResolverCallback);
//     isInitialised = true;
//   }
//   const rez = await compile({});
//   console.log("🤓 rez: ", new Uint8Array(Buffer.from(rez.circuit, "hex")));
//   await initialiseAztecBackend();
//   const acir_ints = new Uint8Array(circuits[circuitName].circuit);
//   // ERROR: reading bytes fail
//   const acir = acir_read_bytes(acir_ints);
//   const [prover] = await setup_generic_prover_and_verifier(acir);
//   const proof = await create_proof(prover, acir, parsedArgs);
//   return JSON.stringify(proof, null, 2);
// };
//
// const generateProofWrapper = (circuitName: CircuitName, form: Record<string, any>) => {
//   return async () => {
//     if (isRunning) throw new Error("A proof generation already in progress");
//     isRunning = true;
//     const proofPromise = generateProof(circuitName, parseForm(form))
//       .then(res => {
//         isRunning = false;
//         circuitProofs[circuitName]!.result = res;
//         return "done with length: " + res.length;
//       })
//       .catch(err => {
//         console.log("🤓 err: ", err);
//         isRunning = false;
//         throw err;
//       });
//     circuitProofs[circuitName]!.resultPromise = proofPromise;
//     return proofPromise;
//   };
// };
//
// const parseForm = (form: Record<string, any>) => {
//   const parameterObj: Record<string, any> = {};
//   for (const [key, value] of Object.entries(form)) {
//     const [, k] = key.split("_");
//     parameterObj[k] = JSON.parse(value);
//   }
//   return parameterObj;
// };
//
// export default function useProofGenerator(circuitName: CircuitName, form: Record<string, any>) {
//   if (circuitProofs[circuitName] === undefined) {
//     circuitProofs[circuitName] = {
//       resultPromise: new Promise(r => r("hej")),
//       result: "",
//     };
//   }
//   return {
//     result: circuitProofs[circuitName]!.result,
//     isLoading: isRunning,
//     generateProof: generateProofWrapper(circuitName, form),
//   };
// }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("🤓 req: ", req.body);
  res.status(200).json({ name: "John Doe" });
}
