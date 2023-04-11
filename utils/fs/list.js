import fs from "fs";

const list = async () => {
  const path = "./files";
  fs.readdir(path, (err, data) => {
    if (err) throw new Error("FS operation failed");
    data.forEach((item) => console.log(item));
  });
};

await list();
