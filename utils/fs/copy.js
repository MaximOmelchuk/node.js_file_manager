import fs from "fs";

const copy = async () => {
  const source = "./files";
  const destination = "./files-copy";

  fs.access(source, (err) => {
    if (err) {
      throw new Error("FS operation failed");
    }
  });

  fs.access(destination, (err) => {
    if (err) {
      fs.cp(source, destination, { recursive: true }, (err) => {
        if (err) console.log(err);
      });
    } else {
      throw new Error("FS operation failed");
    }
  });
};

await copy();
