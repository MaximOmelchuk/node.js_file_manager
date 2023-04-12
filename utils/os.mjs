import os from "os";

const write = (text) => {
  process.stdout.write(`${text}\n`);
};

const osHandler = (input, showInvalidInputMessage) => {
  const flag = input.split(" ")[1]?.slice(2);
  //   console.log(input, "=========input");
  if (!flag) {
    showInvalidInputMessage();
    return;
  }
  if (flag === "EOL") {
    write(JSON.stringify(os.EOL));
  } else if (flag === "cpus") {
    const CPUData = os.cpus();
    const CPUAmount = `Total CPU amount: ${CPUData.length} \n`;
    const CPUspecificInfo = CPUData.map(
      ({ model }, index) => `CPU #${index + 1}: ${model}`
    ).join("\n");
    write(`${CPUAmount}${CPUspecificInfo}`);
  } else if (flag === "homedir") {
    write(os.homedir());
  } else if (flag === "username") {
    write(os.userInfo().username);
  } else if (flag === "architecture") {
    write(os.arch());
  }
};

export default osHandler;
