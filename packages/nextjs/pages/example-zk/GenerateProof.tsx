export const GenerateProof = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <p>Generate proof-of-required-birthyear here. Copy/paste from prev window.</p>
        <input type="text" placeholder="birth-year" />
        <input type="text" placeholder="proof-of-birthyear-signature" />
        <input type="text" placeholder="proof-of-birthyear-publickey-x" />
        <input type="text" placeholder="proof-of-birthyear-publickey-y" />
        <input type="number" placeholder="required birth-year" />
        <button className="border-2 border-black">Generate proof-of-required-birthyear</button>
      </div>
    </>
  );
};
