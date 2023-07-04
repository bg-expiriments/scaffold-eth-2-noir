import { initialiseResolver } from "@noir-lang/noir-source-resolver";
import { compile } from "@noir-lang/noir_wasm";

import { readFileSync, writeFileSync } from "fs";
import { readdir } from "fs/promises";
import path from "path";

const TARGET_FILE = "../nextjs/generated/circuits.json";
const CIRCUITS_FOLDER_PATH = "./circuits";

let currentProject = "";

function fileResolverCallback(id: string) {
  try {
    const path = `${CIRCUITS_FOLDER_PATH}/${currentProject}/src/${id}`;
    console.log("🤓 trying to read:", path);
    const code = readFileSync(path, "utf8") as string;
    return code;
  } catch (err: any) {
    console.error(`❌ error when reading file (${id}) with error: ${err.stack}\n`);
    throw err;
  }
}

async function exportAsJson() {
  initialiseResolver(fileResolverCallback);
  const data: any = {};
  const circuits = await readdir(CIRCUITS_FOLDER_PATH);
  try {
    for (const name of circuits) {
      currentProject = name;
      data[name] = await compile({});
    }
  } catch (err) {
    console.error("Error while compiling:", (err as Error).stack);
  }
  writeFileSync(path.resolve(TARGET_FILE), JSON.stringify(data, null, 2));
}

exportAsJson();
