import path from "path";
import { createHash } from "node:crypto";
import fs from "fs";

const write = (text) => {
  process.stdout.write(`${text}\n`);
};

const hash = ({input, currentPath, showInvalidInputMessage, showFailMessage}) => {
  const inputPath = input.split(" ")[1];
  const resolvedInputPath = path.resolve(currentPath, inputPath);
  if (!fs.existsSync(resolvedInputPath)) {
    showInvalidInputMessage();
  } else {
    fs.readFile(resolvedInputPath, (err, data) => {
      if (err) showFailMessage();
      write(createHash("sha256").update(data.toString()).digest("hex"));
    });
  }
};

export default hash;
