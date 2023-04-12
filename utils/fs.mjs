import fs from "fs";
import path from "path";
import { pipeline } from "stream";

// const errHandler = () => {
//   process.stdout.write(`Operation failed\n`);
// };

// const errHandler = (err) => {
//   if (err) throw new Error(err);
// };

const cat = (input, currentPath, showInvalidInputMessage, showFailMessage) => {
  const inputPath = input.split(" ")[1];
  const resolvedPath = path.resolve(currentPath, inputPath);
  if (fs.existsSync(resolvedPath)) {
    const readStream = fs.createReadStream(resolvedPath);
    readStream.on("data", (chunk) => {
      process.stdout.write(`${chunk.toString()}\n`);
    });
    readStream.on("error", showFailMessage);
  } else {
    showInvalidInputMessage();
  }
};

const add = (input, currentPath, showInvalidInputMessage, showFailMessage) => {
  const inputPath = input.split(" ")[1];
  const resolvedPath = path.resolve(currentPath, inputPath);
  if (fs.existsSync(resolvedPath)) {
    showInvalidInputMessage();
  } else {
    fs.writeFile(resolvedPath, "", (err) => {
      if (err) showFailMessage();
    });
  }
};

const rn = (input, currentPath, showInvalidInputMessage, showFailMessage) => {
  const oldPath = input.split(" ")[1];
  const newFileName = input.split(" ")[2];
  const resolvedPath = path.resolve(currentPath, oldPath);
  if (!oldPath || !newFileName || !fs.existsSync(resolvedPath)) {
    showInvalidInputMessage();
    return;
  } else {
    fs.rename(
      resolvedPath,
      path.resolve(path.parse(resolvedPath).dir, newFileName),
      (err) => {
        if (err) showFailMessage();
      }
    );
  }
};

const cp = async ({
  input,
  currentPath,
  showInvalidInputMessage,
  showFailMessage,
}) => {
  const oldPath = input.split(" ")[1];
  const newPath = input.split(" ")[2];
  const resolvedOldPath = path.resolve(currentPath, oldPath);
  const resolvedNewPath = path.resolve(currentPath, newPath);
  const fileName = path.parse(resolvedOldPath).base;
  const resolvedFullNewPath = path.resolve(resolvedNewPath, fileName);

  if (
    !oldPath ||
    !newPath ||
    !fs.existsSync(resolvedOldPath) ||
    fs.existsSync(resolvedFullNewPath) ||
    !fs.lstatSync(resolvedNewPath).isDirectory()
  ) {
    showInvalidInputMessage();
    return;
  } else {
    pipeline(
      fs.createReadStream(resolvedOldPath),
      fs.createWriteStream(resolvedFullNewPath),
      (err) => {
        if (err) showFailMessage();
      }
    );
  }
};

const rm = ({
  input,
  currentPath,
  showInvalidInputMessage,
  showFailMessage,
}) => {
  const inputPath = input.split(" ")[1];
  const resolvedInputPath = path.resolve(currentPath, inputPath);
  if (fs.existsSync(resolvedInputPath)) {
    fs.unlink(resolvedInputPath, (err) => {
      if (err) showFailMessage();
    });
  } else {
    showInvalidInputMessage();
  }
};

const mv = async ({
  input,
  currentPath,
  showInvalidInputMessage,
  showFailMessage,
}) => {
  await cp({ input, currentPath, showInvalidInputMessage, showFailMessage });
  rm({ input, currentPath, showInvalidInputMessage, showFailMessage });
};

export { cat, add, rn, cp, mv, rm };
