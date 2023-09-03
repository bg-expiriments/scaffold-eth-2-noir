import { Dispatch, SetStateAction, useState } from "react";
import { AgeRestrictedContractExecutor } from "./AgeRestrictedContractExecutor";
import { BirthDateSignature } from "./BirthDateSignature";
import { GenerateProof } from "./GenerateProof";
import SignedStats from "./SignedStats";
import { ZkStepsIntro } from "./ZkStepsIntro";
import type { NextPage } from "next";
import { useBirthYearProofsStore } from "~~/services/store/birth-year-proofs";

const TEN_YEARS = 1000 * 60 * 60 * 24 * 365 * 10;
const YEAR_TEN_YEARS_AGO = new Date(Date.now() - TEN_YEARS).getFullYear();
const INTRO_STEP = 0;
const LAST_STEP = 3;

export function renderZkSteps(currentStep: number, setCurrentStep: Dispatch<SetStateAction<number>>) {
  switch (currentStep) {
    case 0:
      return <ZkStepsIntro setCurrentStep={setCurrentStep} yearTenYearsAgo={YEAR_TEN_YEARS_AGO} />;
    case 1:
      return <BirthDateSignature aliceDefaultAge={YEAR_TEN_YEARS_AGO + 1} />;
    case 2:
      return <GenerateProof requiredBirthYear={YEAR_TEN_YEARS_AGO} />;
    case 3:
      return <AgeRestrictedContractExecutor />;
    default:
      return <></>;
  }
}

const ZkSteps: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const step2ClassName = currentStep >= 2 ? "step-primary" : "";
  const step3ClassName = currentStep >= 3 ? "step-primary" : "";
  const signedBirthYear = useBirthYearProofsStore(state => state.signedBirthYear);
  const signerPublicKey = useBirthYearProofsStore(state => state.signerPublicKey);
  const proof = useBirthYearProofsStore(state => state.proof);
  const step2NotCompleted = !signedBirthYear && !signerPublicKey && currentStep === 1;
  const step3NotCompleted = proof === "0x" && currentStep === 2;
  const previousButtonDisabled = currentStep === INTRO_STEP;
  const nextButtonDisabled = currentStep === LAST_STEP || step2NotCompleted || step3NotCompleted;

  return (
    <>
      <SignedStats />
      {renderZkSteps(currentStep, setCurrentStep)}
      {currentStep !== INTRO_STEP && (
        <>
          <ul className="steps pt-12 steps-vertical md:steps-horizontal">
            <li className="step step-primary">Sign with third party</li>
            <li className={`step ${step2ClassName}`}>Proof of signature</li>
            <li className={`step ${step3ClassName}`}>Receive a balloon</li>
          </ul>
          <div className="join grid grid-cols-2 mt-8 gap-8">
            <>
              <button
                className="join-item btn btn-outline"
                onClick={() => setCurrentStep(currentStep => currentStep - 1)}
                disabled={previousButtonDisabled}
              >
                Previous
              </button>
              {currentStep !== LAST_STEP && (
                <button
                  className="join-item btn btn-outline"
                  onClick={() => setCurrentStep(currentStep => currentStep + 1)}
                  disabled={nextButtonDisabled}
                >
                  Next
                </button>
              )}
            </>
          </div>
        </>
      )}
    </>
  );
};

export default ZkSteps;
