require("dotenv").config();
const { execSync } = require("child_process");

const args = process.argv.slice(2);
const reportDirIndex = args.indexOf("--report-dir");
const reportDir =
  reportDirIndex !== -1 && args[reportDirIndex + 1]
    ? args[reportDirIndex + 1]
    : "";

const command = `${
  process.env.CURRENTS_API_URL
    ? `CURRENTS_API_URL=${process.env.CURRENTS_API_URL}`
    : ""
} npx currents upload --key=${process.env.CURRENTS_KEY} --project-id=${
  process.env.CURRENTS_PROJECT_ID
} --report-dir ${reportDir} --debug`;

try {
  execSync(command, { stdio: "inherit" });
} catch (error) {
  console.error("Error executing command:", error);
}
