// TODO: rename to requiredBirthYear
import { Dispatch, SetStateAction } from "react";

type ZkStepsIntroProps = { setCurrentStep: Dispatch<SetStateAction<number>>; yearTenYearsAgo: number };

export const ZkStepsIntro = ({ setCurrentStep, yearTenYearsAgo }: ZkStepsIntroProps) => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-3xl">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold">ZK Age Restriction</h1>
            <p className="py-6 text-left">
              Alice has heard that balloon store in town is handing out balloons 🎈 to anyone who is 10 years old or
              younger. However, Alice does not want to share her age with anyone. Lucky for her, the balloon store has a
              zero knowledge proof solution. This means she can claim her balloon 🎈 and only share as little
              information as necessary publicly. Here is how she would go about it...
              <br />
            </p>
            <ol className="list-decimal list-inside text-left">
              {/* When the list is centered it looks weird, but perhaps there is another solution than `text-left`?*/}
              <li>
                First, she needs to find a trusted third party 🏛 that can give her an official signature 📜 that she is
                born in a specific year.
              </li>
              <li>
                Then, she needs to generate a zero knowledge proof ✅. It should prove that the signed birth year is
                greater than or equal to {yearTenYearsAgo} and that the signature 📜 is done by a known public key.
              </li>
              <li>
                Finally, Alice can call the balloon store&apos;s age restricted contract with her proof ✅ and get a
                balloon 🎈.
              </li>
            </ol>
          </div>
          <button className="btn btn-secondary mt-6" onClick={() => setCurrentStep(currentStep => currentStep + 1)}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
