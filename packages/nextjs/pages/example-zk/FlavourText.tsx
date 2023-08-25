export const FlavourText = ({ yearTenYearsAgo }: { yearTenYearsAgo: number }) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="py-6">
          {" "}
          Alice has heard that balloon store in town are handing out balloons for anyone born after {yearTenYearsAgo},
          i.e. are 9/10 years old, or younger. However, Alice does not want to share her age with anyone. Lucky for her,
          the balloon store has a zero knowledge proof solution. This means she can claim her balloon and only share as
          little information as necessary with the store.
          <br />
        </p>
        <ol className="list-decimal list-inside">
          <li>Get a proof-of-birthyear-signature from a &quot;local authority&quot;</li>
          <li>Generate a proof-of-required-age from the proof-of-birthdate-signature</li>
          <li>Call age restricted contract with proof and get a balloon</li>
        </ol>
      </div>
    </>
  );
};
