import { Proof } from "~~/interfaces";

export const ProofResult = ({ proof }: { proof: Proof | undefined }) => {
  return (
    <div className="flex-wrap collapse collapse-arrow mb-2">
      <input type="checkbox" className="min-h-0 peer" />
      <div className="collapse-title text-sm rounded-3xl peer-checked:rounded-b-none min-h-0 bg-secondary py-1.5">
        <strong>Generated proof</strong>
      </div>
      <div className="collapse-content overflow-auto bg-secondary rounded-t-none rounded-3xl">
        <pre className="text-xs pt-4">{JSON.stringify(proof, null, 2)}</pre>
      </div>
    </div>
  );
};
