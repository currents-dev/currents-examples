const fs = require("fs");
const xml2js = require("xml2js");
const path = require("path");

const args = process.argv.slice(2);
const reportsDirIndex = args.indexOf("--reports-dir");
const outputFileIndex = args.indexOf("--output-file");
const groupNameIndex = args.indexOf("--group-name");

const reportsDir =
  reportsDirIndex !== -1 ? args[reportsDirIndex + 1] : "results";
const outputFile =
  outputFileIndex !== -1
    ? args[outputFileIndex + 1]
    : "combined-results.xml";
const groupName = groupNameIndex !== -1 ? args[groupNameIndex + 1] : "junit";

if (reportsDirIndex === -1 || outputFileIndex === -1) {
  console.log(
    "Usage: node script.js --reports-dir <directory> --output-file <file>"
  );
  console.log(
    `Using defaults: --reports-dir="${reportsDir}" --output-file="${outputFile}"`
  );
}

async function processTestSuites(testsuites) {
  const processedSuites = [];

  for (let i = 0; i < testsuites.length; i++) {
    const currentSuite = testsuites[i];
    const nextSuite = testsuites[i + 1];

    if (currentSuite.$.name === "Root Suite" && nextSuite) {
      // Add file property from Root Suite to next suite
      nextSuite.$.file = currentSuite.$.file;
      // Skip the Root Suite (increment i)
      i++;
      processedSuites.push(nextSuite);
    } else if (currentSuite.$.name !== "Root Suite") {
      // Keep non-Root suites as they are
      processedSuites.push(currentSuite);
    }
  }

  return processedSuites;
}

async function combineResults() {
  const folderPath = reportsDir;

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("Folder created:", folderPath);
  } else {
    console.log("Folder already exists:", folderPath);
  }
  const files = fs
    .readdirSync(reportsDir)
    .filter((f) => f.startsWith("results-") && f.endsWith(".xml"));

  let combinedTestsuites = {
    testsuites: {
      $: {
        name: groupName,
      },
      testsuite: [],
    },
  };

  for (const file of files) {
    const content = fs.readFileSync(path.join(reportsDir, file), "utf-8");
    const result = await xml2js.parseStringPromise(content);

    if (result.testsuites && result.testsuites.testsuite) {
      const processedSuites = await processTestSuites(
        result.testsuites.testsuite
      );
      combinedTestsuites.testsuites.testsuite.push(...processedSuites);
    }
  }

  const builder = new xml2js.Builder();
  const xml = builder.buildObject(combinedTestsuites);

  fs.writeFileSync(outputFile, xml);

  // Optionally clean up individual result files
  // files.forEach((file) => fs.unlinkSync(path.join(reportsDir, file)));

  console.log("Results combined into:", outputFile);
}

combineResults().catch(console.error);
