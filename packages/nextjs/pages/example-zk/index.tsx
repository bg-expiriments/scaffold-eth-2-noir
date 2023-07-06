import { AgeRestrictedContractExecutor } from "./AgeRestrictedContractExecutor";
import { BirthDateSignature } from "./BirthDateSignature";
import { FlavourText } from "./FlavourText";
import { GenerateProof } from "./GenerateProof";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const TEN_YEARS = 1000 * 60 * 60 * 24 * 365 * 10;
const YEAR_TEN_YEARS_AGO = new Date(Date.now() - TEN_YEARS).getFullYear();
const ExampleUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Example UI ZK | Scaffold-ETH 2"
        description="Example UI ZK, showing how to use ZK circuits in your UI."
      ></MetaHeader>
      <div className="grid lg:grid-cols-3 flex-grow" data-theme="exampleUi">
        <FlavourText yearTenYearsAgo={YEAR_TEN_YEARS_AGO} />
        <div className="flex flex-col justify-center items-center"></div>
      </div>
      <div className="grid lg:grid-cols-3 flex-grow" data-theme="exampleUi">
        <BirthDateSignature />
        <GenerateProof />
        <AgeRestrictedContractExecutor />
      </div>
    </>
  );
};

export default ExampleUI;
