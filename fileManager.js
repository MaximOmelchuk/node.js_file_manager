import { homedir } from "os";
import path from "path";

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
    if (currentPath !== root) {
      currentPath = path.parse(currentPath).dir;
    }
  } else if (input.startsWith("cd")) {
    const inputPath = input.split(" ")?.[1];
    if (!inputPath) {
      showInvalidInputMessage();
      return;
    } else if (path.parse(inputPath).root === root) {
      currentPath = inputPath;
    } else {
      currentPath = path.join(currentPath, inputPath);
    }
  } else if (input === "ls") {
    const structDatas = [
      {
        handler: "http",
        endpoint: "http://localhost:3000/path",
        method: "ALL",
      },
      {
        handler: "event",
        endpoint: "http://localhost:3000/event",
        method: "POST",
      },
      { handler: "GCS", endpoint: "http://localhost:3000/GCS", method: "POST" },
    ];
    console.table(structDatas);
  }
  showCurrentPath(currentPath);
  //   console.log("data");
  //   process.exit();
});

process.on("SIGINT", goodbyeHandler);
