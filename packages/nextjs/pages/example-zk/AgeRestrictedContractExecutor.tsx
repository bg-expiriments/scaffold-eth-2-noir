import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useBirthYearProofsStore } from "~~/services/store/birth-year-proofs";

export const AgeRestrictedContractExecutor = () => {
  const proof = useBirthYearProofsStore(state => state.proof);

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "BalloonVendor",
    functionName: "redeemFreeTokens",
    args: [proof],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your proof of having the required birth year</span>
            </label>
            <input
              type="text"
              placeholder="Proof of required birthyear"
              value={proof}
              className="input input-bordered"
            />
          </div>
          <button className="btn btn-primary mt-6" onClick={() => writeAsync()} disabled={isLoading}>
            Call age restricted contract with proof
          </button>
        </div>
      </div>
    </>
  );
};
