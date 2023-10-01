import { create } from "zustand";
import { HexString } from "~~/hooks/noir/useProofGenerator";

type BirthYearProofs = {
  ethereumAddress: string;
  birthYear: number;
  signedBirthYear: string;
  signerPublicKey: string;
  proof: HexString;
  setEthereumAddress: (input: string) => void;
  setBirthYear: (input: string) => void;
  setSignedBirthYear: (input: string) => void;
  setSignerPublicKey: (input: string) => void;
  setProof: (input: HexString) => void;
};

export const useBirthYearProofsStore = create<BirthYearProofs>(set => ({
  ethereumAddress: "",
  birthYear: 2014,
  signedBirthYear: "",
  signerPublicKey: "",
  proof: "0x",
  setEthereumAddress: (input: string) => set({ ethereumAddress: input }),
  setBirthYear: (input: string) => set({ birthYear: Number(input) }),
  setSignedBirthYear: (input: string) => set({ signedBirthYear: input }),
  setSignerPublicKey: (input: string) => set({ signerPublicKey: input }),
  setProof: (input: HexString) => set({ proof: input }),
}));
