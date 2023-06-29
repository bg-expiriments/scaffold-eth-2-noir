import path from "path";
import { readdir, readFile } from "fs/promises";

const circuits: any = {};

function getPath(fileName?: string) {
  if (!fileName) {
    return path.resolve(process.cwd(), "./circuits/src");
  }
  return path.resolve(process.cwd(), "./circuits/src", fileName);
}
// TODO: remove all this since we use public-folder in nextjs

export async function setup() {
  const circuitPaths = await readdir(getPath());
  for (const p of circuitPaths) {
    // console.log("🗒 path: ", p);
    circuits[p] = await readFile(getPath(p), "utf8");
  }
}

export async function getCircuits() {
  return circuits;
}
