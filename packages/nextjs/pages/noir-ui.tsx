import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { MetaHeader } from "~~/components/MetaHeader";
import { CircuitUI } from "~~/components/noir-ui/Circuit";
import { CircuitName } from "~~/utils/noir";

const selectedCircuitStorageKey = "scaffoldEth2.selectedCircuit";

const NoirUI: NextPage = () => {
  const circuitNames = ["main.nr"];
  const [selectedCircuit, setSelectedCircuit] = useLocalStorage<CircuitName>(
    selectedCircuitStorageKey,
    circuitNames[0],
  );
  return (
    <>
      <MetaHeader title="Noir UI" description="Testing basic noir functions, not using any chain-functionality." />
      <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
        {circuitNames.length > 1 && (
          <div className="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
            {circuitNames.map(circuitName => (
              <button
                className={`btn btn-secondary btn-sm normal-case font-thin ${
                  circuitName === selectedCircuit ? "bg-base-300" : "bg-base-100"
                }`}
                key={circuitName}
                onClick={() => setSelectedCircuit(circuitName)}
              >
                {circuitName}
              </button>
            ))}
          </div>
        )}
        {circuitNames.map(circuitName => (
          <CircuitUI
            key={circuitName}
            circuitName={circuitName}
            className={circuitName === selectedCircuit ? "" : "hidden"}
          />
        ))}
      </div>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Debug Noir</h1>
        <p className="text-neutral">
          You can debug & interact with your deployed Noir-circuits here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / pages / noir-ui.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default NoirUI;
