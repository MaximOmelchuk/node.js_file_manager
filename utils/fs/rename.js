import fs from "fs";

const rename = async () => {
  const prevName = "./files/wrongFilename.txt";
  const newName = "./files/properFilename.md";
  const callbackBuilder = (flag) => (e) => {
    if (flag) {
      if (e) throw new Error("FS operation failed");
    } else {
      if (!e) throw new Error("FS operation failed");
    }
  };

  fs.access(prevName, callbackBuilder(true));
  fs.access(newName, callbackBuilder(false));
  fs.rename(prevName, newName, callbackBuilder(true));
};

await rename();
