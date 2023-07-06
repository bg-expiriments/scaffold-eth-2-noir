import { spawn } from "child_process";
import { readFile, writeFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { CircuitName } from "~~/utils/noir/circuit";

let isRunning = false;

async function spawnChild(name: string, args?: any, options?: any) {
  const child = spawn(name, args, options);

  let data = "";
  for await (const chunk of child.stdout) {
    console.log("stdout chunk: " + chunk);
    data += chunk;
  }
  let error = "";
  for await (const chunk of child.stderr) {
    console.error("stderr chunk: " + chunk);
    error += chunk;
  }
  const exitCode = await new Promise(resolve => {
    child.on("close", resolve);
  });

  if (exitCode) {
    throw new Error(`subprocess error exit ${exitCode}, ${error}`);
  }
  return data;
}

const getProverToml = (parsedArgs: any) => {
  let toml = "";
  for (const [key, value] of Object.entries(parsedArgs)) {
    toml += `${key} = ${JSON.stringify(value)}\n`;
  }
  return toml;
};

async function logProof(proof: string) {
  console.log("✅ here is the proof in byte32, ready to paste into the UI...\n0x" + proof);
}

async function logPublicInputs(circuitName: CircuitName) {
  const p = path.join(__dirname, `../../../../../noir/circuits/${circuitName}/Verifier.toml`);
  const verifierToml = await readFile(p, "utf-8");
  const publicInputs = [];
  for (const line of verifierToml.split("\n")) {
    const input = line.split(" = ")[1];
    if (input) {
      publicInputs.push(JSON.parse(input));
    }
  }
  console.log("🔍 here is the publicInputs, ready to paste into the UI...\n" + JSON.stringify(publicInputs));
}

async function generateProof(circuitName: CircuitName, parsedArgs?: any) {
  const cwd = path.join(__dirname, `../../../../../noir/circuits/${circuitName}`);
  const p = path.join(cwd, "Prover.toml");
  console.log("📝 writing to: ", p);
  await writeFile(p, getProverToml(parsedArgs));
  console.log("🧠 generating proof...");
  const res = await spawnChild("nargo", ["prove"], {
    cwd,
  });
  logProof(res);
  logPublicInputs(circuitName);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (req.body.circuitName === undefined) {
    res.status(400).json({ error: "Missing circuitName" });
    return;
  }
  if (req.body.parsedArgs === undefined) {
    res.status(400).json({ error: "Missing parsedArgs" });
    return;
  }
  if (isRunning) {
    res.status(400).json({ error: "A proof generation already in progress" });
    return;
  }
  isRunning = true;

  const { circuitName, parsedArgs } = req.body;
  generateProof(circuitName, parsedArgs)
    .then(() => {
      isRunning = false;
    })
    .catch(err => {
      isRunning = false;
      console.error("❌ Error generating proof: ", err);
    });
  res.status(200).json("Proof generation started, result will be logged to server console");
}
