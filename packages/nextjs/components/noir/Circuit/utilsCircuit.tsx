import { Circuit, CircuitName } from "~~/utils/noir/circuit";

const getCircuitParams = (abi: Circuit<CircuitName>["abi"] | null): { params: (JSX.Element | null)[] } => {
  if (!abi) return { params: [] };
  const params = abi.parameters
    .map(param => {
      if (param.name && param.type && param.visibility) {
        return (
          <div key={param.name} className="flex flex-col gap-1">
            <span className="font-bold">{param.name}</span>
            <span className="text-sm">{param.type.kind}</span>
            <span className="text-sm">{param.visibility}</span>
          </div>
        );
      }
      return null;
    })
    .filter(n => n);
  return { params };
};

// TODO: return-values
export { getCircuitParams };
