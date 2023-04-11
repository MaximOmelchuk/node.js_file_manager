import fs from "fs";
const read = async () => {
  const path = "./files/fileToRead.txt";
  const stream = fs.createReadStream(path);
  stream.on("error", (error) => console.log(error));
  stream.on("data", (chunk) => process.stdout.write(chunk));
};

await read();
