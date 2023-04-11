import fs from "fs";
import zlib from "zlib";

const compress = async () => {
  const soursePath = "./files/fileToCompress.txt";
  const destPath = "./files/archive.gz";

  fs.createReadStream(soursePath)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(destPath))
    .on("finish", () =>
      fs.unlink(soursePath, (err) => {
        if (err) console.log(err);
      })
    );
};

await compress();
