import fs from "fs";
const write = async () => {
  const path = "./files/fileToWrite.txt";
  const stream = fs.createWriteStream(path);
  process.stdin.on("data", (chunk) => {
    stream.write(chunk);
  });
};

await write();
