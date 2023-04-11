import fs from "fs";

const remove = async () => {
  const path = "./files/fileToRemove.txt";
  const callback = (e) => {
    if (e) throw new Error("FS operation failed");
  };
  fs.unlink(path, callback);
};

await remove();
