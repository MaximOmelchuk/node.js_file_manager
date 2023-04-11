import fs from "fs";
import zlib from "zlib";

const decompress = async () => {
  const soursePath = "./files/fileToCompress.txt";
  const destPath = "./files/archive.gz";

  fs.writeFile(soursePath, "", (err) => {
    if (err) console.log(err);
  });

  fs.createReadStream(destPath)
    .pipe(zlib.createUnzip())
    .pipe(fs.createWriteStream(soursePath))
    .on("finish", () =>
      fs.unlink(destPath, (err) => {
        if (err) console.log(err);
      })
    );
};

await decompress();
