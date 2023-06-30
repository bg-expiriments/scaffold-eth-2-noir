import { CircuitName, circuits } from "~~/utils/noir/circuit";

export function getCircuitNames() {
  return (Object.keys(circuits) as CircuitName[]) || [];
}
