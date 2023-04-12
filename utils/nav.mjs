import path from "path";
import fs from "fs";

const root = path.parse(process.cwd()).root;

const up = (currentPath, showInvalidInputMessage) => {
  if (currentPath !== root) {
    currentPath = path.parse(currentPath).dir;
  } else {
    showInvalidInputMessage();
  }
};

const cd = (input, currentPath, showInvalidInputMessage) => {
  const inputPath = input.split(" ")?.[1];
  console.log(input.slice(0, 2));
  if (!inputPath || (currentPath === root && inputPath.slice(0, 2) === "..")) {
    showInvalidInputMessage();
  } else if (path.parse(inputPath).root === root) {
    if (fs.existsSync(inputPath) && fs.lstatSync(inputPath).isDirectory()) {
      return inputPath;
    } else {
      showInvalidInputMessage();
    }
  } else {
    if (
      fs.existsSync(path.join(currentPath, inputPath)) &&
      fs.lstatSync(path.resolve(currentPath, inputPath)).isDirectory()
    ) {
      return path.join(currentPath, inputPath);
    } else {
      showInvalidInputMessage();
    }
  }
  return currentPath;
};

export { up, cd };
