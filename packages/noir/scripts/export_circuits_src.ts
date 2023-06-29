import path from "path";
import { readdir, readFile, writeFile } from "fs/promises";

const TARGET_FILE = "../nextjs/generated/circuits.json";

function getPath(fileName?: string) {
  if (!fileName) {
    return path.resolve(process.cwd(), "./circuits/src");
  }
  return path.resolve(process.cwd(), "./circuits/src", fileName);
}

export async function getCircuits() {
  const circuits: any = {};
  const circuitPaths = await readdir(getPath());
  for (const p of circuitPaths) {
    // console.log("🗒 path: ", p);
    circuits[p] = await readFile(getPath(p), "utf8");
  }
  return circuits;
}

async function exportAsJson() {
  const circuits = await getCircuits();
  await writeFile(path.resolve(TARGET_FILE), JSON.stringify(circuits, null, 2));
}

exportAsJson();
