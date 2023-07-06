export const BirthDateSignature = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-red-50">
        <p>This is as the role of the authority in town.</p>
        <p>Generate proof-of-birthyear-signature here.</p>
        <input type="number" placeholder="birth-year" />
        <input type="text" placeholder="super-secret-key-for-signing" />
        <button className="border-2 border-black">Generate proof-of-birthyear-signature</button>
      </div>
    </>
  );
};
