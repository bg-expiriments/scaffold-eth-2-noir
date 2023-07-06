export const AgeRestrictedContractExecutor = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <p>Call age restricted contract with proof here. Copy/paste from prev window.</p>
        <input type="text" placeholder="proof-of-required-birthyear" />
        <input type="number" placeholder="required birth-year (that was used to generate proof)" />
        <input type="text" placeholder="proof-of-birthyear-signature" />
        <input type="text" placeholder="balloon color" />
        <button className="border-2 border-black">Call age restricted contract with proof</button>
      </div>
    </>
  );
};
