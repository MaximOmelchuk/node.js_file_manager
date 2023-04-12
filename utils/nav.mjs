import path from "path";
import fs from "fs";

const root = path.parse(process.cwd()).root;

const up = ({ currentPath, showInvalidInputMessage }) => {
  if (currentPath !== root) {
    return path.parse(currentPath).dir;
  } else {
    showInvalidInputMessage();
    return currentPath;
  }
};

const cd = ({ input, currentPath, showInvalidInputMessage }) => {
  const inputPath = input.split(" ")?.[1];
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

const ls = ({ currentPath, showFailMessage }) => {
  const foldersTableList = [];
  const filesTableList = [];
  fs.readdir(currentPath, (err, data) => {
    if (err) {
      showFailMessage();
      return;
    }
    data.forEach((file) => {
      const fileDetails = fs.lstatSync(path.resolve(currentPath, file));
      fileDetails.isDirectory()
        ? foldersTableList.push({ Name: file, Type: "directory" })
        : filesTableList.push({ Name: file, Type: "file" });
    });
    const sortByName = (a, b) => a.Name > b.Name;
    console.table([
      ...foldersTableList.sort(sortByName),
      ...filesTableList.sort(sortByName),
    ]);
  });
};

export { up, cd, ls };
