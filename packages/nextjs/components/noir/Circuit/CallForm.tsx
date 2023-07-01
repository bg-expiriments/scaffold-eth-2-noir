import { useState } from "react";
import { CallFormInput } from "./CallFormInput";
import { getFunctionInputKey, getInitialFormState } from "./utilsCircuit";
import { TxReceipt } from "~~/components/scaffold-eth";
import { CircuitAbiParameters, CircuitName } from "~~/utils/noir/circuit";

type TCallFormProps = {
  circuitName: CircuitName;
  params: CircuitAbiParameters;
};

export const CallForm = ({ circuitName, params }: TCallFormProps) => {
  const [form, setForm] = useState<Record<string, any>>(() => getInitialFormState(circuitName, params));

  // TODO: ...

  const handleWrite = async () => {
    console.log("TODO: handleWrite");
  };
  //const [displayedTxResult, setDisplayedTxResult] = useState<TransactionReceipt>();
  const displayedTxResult = "I am a proof result";

  const inputs = params.map((p, index) => {
    const key = getFunctionInputKey(circuitName, p, index);
    return (
      <CallFormInput
        key={key}
        setForm={updatedFormValue => {
          //setDisplayedTxResult(undefined);
          setForm(updatedFormValue);
        }}
        form={form}
        stateObjectKey={key}
        param={p}
      />
    );
  });

  return (
    <div className="py-5 space-y-3 first:pt-0 last:pb-1">
      <div className={"flex gap-3 flex-col"}>
        {inputs}
        <div className="flex justify-between gap-2">
          <div className="flex-grow basis-0">
            {displayedTxResult ? <TxReceipt txResult={displayedTxResult} /> : null}
          </div>
        </div>
        <div className={"flex"}>
          <button className={"btn btn-secondary btn-sm"} onClick={handleWrite}>
            Generate proof 🧠
          </button>
        </div>
      </div>
    </div>
  );
};
