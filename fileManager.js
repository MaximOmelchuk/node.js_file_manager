import { homedir } from "os";
import path from "path";
import fs from "fs";
import { cat, add, rn, cp, mv, rm } from "./utils/fs.mjs";
import osHandler from "./utils/os.mjs";
import hash from "./utils/hash.mjs";
import { compress, decompress } from "./utils/zip.mjs";
import { up, cd } from "./utils/nav.mjs";

const userName =
  process.argv
    .find((item) => item.startsWith("--username="))
    ?.replace(/^--username=/, "") || "Unknown User";
const root = path.parse(process.cwd()).root;
let currentPath = homedir();
const helloMessage = `Welcome to the File Manager, ${userName}!\n`;
const goodbyeMessage = `Thank you for using File Manager, ${userName}, goodbye!\n`;
const invalidInputMessage = `Invalid input\n`;
const failMessage = `Operation failed\n`;

const goodbyeHandler = () => {
  process.stdout.write(goodbyeMessage);
  process.exit();
};
const showCurrentPath = (path) => {
  process.stdout.write(`You are currently in ${path}\n`);
};
const showInvalidInputMessage = () => {
  process.stdout.write(invalidInputMessage);
};
const showFailMessage = () => {
  process.stdout.write(failMessage);
};
process.stdout.write(helloMessage);
showCurrentPath(currentPath);

process.stdin.on("data", (data) => {
  const input = data.toString().slice(0, -2);
  if (input === ".exit") {
    goodbyeHandler();
    return;
  }
  if (input === "up") {
    up(currentPath, showInvalidInputMessage);
  } else if (input.startsWith("cd ")) {
    currentPath = cd(input, currentPath, showInvalidInputMessage);
  } else if (input === "ls") {
    const foldersTableList = [];
    const filesTableList = [];
    fs.readdir(currentPath, (err, data) => {
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
  } else if (input.startsWith("cat ")) {
    cat(input, currentPath, showInvalidInputMessage);
  } else if (input.startsWith("add ")) {
    add(input, currentPath, showInvalidInputMessage);
  } else if (input.startsWith("rn ")) {
    rn(input, currentPath, showInvalidInputMessage);
  } else if (input.startsWith("cp ")) {
    cp(input, currentPath, showInvalidInputMessage);
  } else if (input.startsWith("mv ")) {
    mv(input, currentPath, showInvalidInputMessage);
  } else if (input.startsWith("rm ")) {
    rm(input, currentPath, showInvalidInputMessage);
  } else if (input.startsWith("os ")) {
    osHandler(input, showInvalidInputMessage);
  } else if (input.startsWith("hash ")) {
    hash(input, currentPath, showInvalidInputMessage, showFailMessage);
  } else if (input.startsWith("compress ")) {
    compress(input, currentPath, showInvalidInputMessage, showFailMessage);
  } else if (input.startsWith("decompress ")) {
    decompress(input, currentPath, showInvalidInputMessage, showFailMessage);
  } else {
    showInvalidInputMessage();
  }

  showCurrentPath(currentPath);
});

process.on("SIGINT", goodbyeHandler);
