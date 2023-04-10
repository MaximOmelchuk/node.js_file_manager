const userName =
  process.argv
    .find((item) => item.startsWith("--username="))
    ?.replace(/^--username=/, "") || "Unknown User";
const helloMessage = `Welcome to the File Manager, ${userName}!\n`;
const goodbyeMessage = `Thank you for using File Manager, ${userName}, goodbye!\n`;
const goodbyeHandler = () => {
  process.stdout.write(goodbyeMessage);
  process.exit();
};

process.stdout.write(helloMessage);
process.stdin.on("data", (data) => {
  if (data.toString().slice(0, -2) === ".exit") {
    goodbyeHandler();
    return;
  }
  //   console.log("data");
  //   process.exit();
});

process.on("SIGINT", goodbyeHandler);
