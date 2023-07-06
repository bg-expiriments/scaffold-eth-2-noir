import { useMemo } from "react";
import { CallForm } from "./CallForm";
import { useCircuitAbi } from "~~/hooks/noir";
import { CircuitAbi, CircuitName } from "~~/utils/noir/circuit";

type CircuitUIProps = {
  circuitName: CircuitName;
  className?: string;
};

const getCircuitCallForm = (circuitName: CircuitName, abi: CircuitAbi | null): JSX.Element | null => {
  if (!abi) return null;
  return <CallForm circuitName={circuitName} params={abi.parameters} />;
};

/**
 * UI component to interface with circuits.
 **/
export const CircuitUI = ({ circuitName, className = "" }: CircuitUIProps) => {
  const { abi } = useCircuitAbi(circuitName);
  const circuitCallFormDisplay = useMemo(() => getCircuitCallForm(circuitName, abi), [circuitName, abi]);

  if (!abi) {
    return <p className="text-3xl mt-14">{`No ABI found for the circuit "${circuitName}"!`}</p>;
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-6 px-6 lg:px-10 lg:gap-12 w-full max-w-7xl my-0 ${className}`}>
      <div className="col-span-5 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div className="col-span-1 flex flex-col">
          <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4">
            <div className="flex">
              <div className="flex flex-col gap-1">
                <span className="font-bold">{circuitName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <div className="z-10">
            <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
              <div className="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
                <div className="flex items-center justify-center space-x-2">
                  <p className="my-0 text-sm">Prove</p>
                </div>
              </div>
              <div className="p-5 divide-y divide-base-300">{circuitCallFormDisplay || "No read methods"}</div>
            </div>
          </div>
          <div className="z-10">
            <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
              <div className="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
                <div className="flex items-center justify-center space-x-2">
                  <p className="my-0 text-sm">Verify 🔍</p>
                </div>
              </div>
              <div className="p-5 divide-y divide-base-300">
                <p>Verification is currently only done on-chain.</p>
                {/* TODO */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
