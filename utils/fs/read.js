import fs from "fs";

const read = async () => {
  const path = "./files/fileToRead.txt";
  fs.readFile(path, (err, data) => {
    if (err) throw new Error("FS operation failed");
    console.log(data.toString());
  });
};

await read();
