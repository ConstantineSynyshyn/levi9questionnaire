import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { spawn } from "child_process";

export default function js(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return;
  const { code } = req.body;
  let result: any;
  let fileName = uuidv4() + ".js";
  try {
    fs.writeFileSync(fileName, code);
    // spawn a new child process
    const javaScript = spawn("node", [fileName]);
    javaScript.stdout.on("data", function (data) {
      result = { type: "success", data: data.toString() };
    });
    javaScript.stderr.on("data", function (data) {
      result = { type: "error", data: data.toString() };
    });
    javaScript.on("close", (code) => {
      fs.unlinkSync(fileName);
      res.json(result);
    });
  } catch (e) {
    fs.unlinkSync(fileName);
    console.log(`Exception occurred!!!`);
  }
}
