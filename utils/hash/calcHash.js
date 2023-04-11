import { createHash } from "node:crypto";
import fs from "fs";

const calculateHash = async () => {
  fs.readFile("./files/fileToCalculateHashFor.txt", (err, data) => {
    if (err) throw new Error(err);
    console.log(createHash("sha256").update(data.toString()).digest("hex"));
  });
};

await calculateHash();
