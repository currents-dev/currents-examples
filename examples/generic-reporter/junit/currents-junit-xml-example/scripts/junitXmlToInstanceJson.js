const fs = require("fs");
const { parseStringPromise } = require("xml2js");
const crypto = require("node:crypto");
const { join } = require("path");

// Get command line arguments
const args = process.argv.slice(2);

// Set up argument parsing
let xmlFilePath, outputDir;

// Parse command line arguments
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--input" || args[i] === "-i") {
    xmlFilePath = args[i + 1];
    i++;
  } else if (args[i] === "--output" || args[i] === "-o") {
    outputDir = args[i + 1];
    i++;
  }
}

// Validate required arguments
if (!xmlFilePath || !outputDir) {
  console.error(
    "Usage: node script.js --input <xml-file-path> --output <output-directory>"
  );
  console.error(
    "   or: node script.js -i <xml-file-path> -o <output-directory>"
  );
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function generateTestId(testName, suiteName) {
  const combinedString = `${testName}${suiteName}`;
  const fullHash = crypto
    .createHash("sha256")
    .update(combinedString)
    .digest("hex");
  return fullHash.substring(0, 16);
}

function generateShortHash(specName) {
  const hash = crypto.createHash("sha256").update(specName).digest("base64");
  const shortHash = hash
    .slice(0, 8)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return shortHash;
}

fs.readFile(xmlFilePath, "utf-8", async (err, data) => {
  if (err) {
    console.error("Error reading XML file:", err);
    return;
  }

  // xml2js.parseString(
  //   data,
  //   { explicitArray: false, mergeAttrs: true },
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error parsing XML:", err);
  //       return;
  //     }

  //     const testsuites = Array.isArray(result.testsuites.testsuite)
  //       ? result.testsuites.testsuite
  //       : [result.testsuites.testsuite];

  //     testsuites.forEach((suite) => {
  //       const startTime = new Date(suite.timestamp);
  //       const durationMillis = secondsToMilliseconds(parseFloat(suite.time));
  //       const endTime = new Date(startTime.getTime() + durationMillis);

  //       const testcases = Array.isArray(suite.testcase)
  //         ? suite.testcase
  //         : [suite.testcase];

  //       const suiteJson = {
  //         groupId: result.testsuites.name,
  //         spec: suite.name,
  //         worker: {
  //           workerIndex: 1,
  //           parallelIndex: 1,
  //         },
  //         startTime: suite.timestamp,
  //         results: {
  //           stats: {
  //             suites: testcases.length,
  //             tests: parseInt(suite.tests),
  //             passes: testcases.filter((tc) => !tc?.failure).length,
  //             pending: 0,
  //             skipped: 0,
  //             failures: testcases.filter((tc) => tc?.failure).length,
  //             flaky: 0,
  //             wallClockStartedAt: suite.timestamp,
  //             wallClockEndedAt: endTime.toISOString(),
  //             wallClockDuration: durationMillis,
  //           },
  //           tests: testcases.map((test) => {
  //             const hasFailure = test?.failure && test?.failure !== "false";
  //             return {
  //               _t: Date.now(),
  //               testId: generateTestId(test?.name, suite.name),
  //               title: [test?.name],
  //               state: hasFailure ? "failed" : "passed",
  //               isFlaky: false,
  //               expectedStatus: hasFailure ? "failed" : "passed",
  //               timeout: 0,
  //               location: {
  //                 column: 1,
  //                 file: suite.file ?? suite.name,
  //                 line: 1,
  //               },
  //               retries: 1,
  //               attempts: [
  //                 {
  //                   _s: hasFailure ? "failed" : "passed",
  //                   attempt: 1,
  //                   workerIndex: 1,
  //                   parallelIndex: 1,
  //                   startTime: suite.timestamp,
  //                   steps: [],
  //                   duration: secondsToMilliseconds(parseFloat(test?.time)),
  //                   status: hasFailure ? "failed" : "passed",
  //                   stdout: test?.["system-out"]
  //                     ? [test?.["system-out"]]
  //                     : undefined,
  //                   stderr: hasFailure
  //                     ? extractFailure(test?.failure)
  //                     : undefined,
  //                   errors: hasFailure
  //                     ? [
  //                         mergeFailuresIntoMessage(
  //                           extractFailure(test?.failure)
  //                         ) ?? {},
  //                       ]
  //                     : undefined,
  //                   error: hasFailure
  //                     ? mergeFailuresIntoMessage(
  //                         extractFailure(test?.failure)
  //                       ) ?? {}
  //                     : undefined,
  //                 },
  //               ],
  //             };
  //           }),
  //         },
  //       };

  //       const fileNameHash = generateShortHash(suite.name);

  //       fs.writeFileSync(
  //         `${outputDir}/${fileNameHash}.json`,
  //         JSON.stringify(suiteJson, null, 2),
  //         "utf8"
  //       );
  //       console.log(
  //         `Created JSON file for testsuite ${suite.name} at ${outputDir}/${fileNameHash}.json`
  //       );
  //     });

  //   }
  // );
  const instances = await getInstanceMap(data);
  console.log("RES::", instances);
  await Promise.all(
    Array.from(instances.entries()).map(([name, report]) => {
      fs.writeFile(
        join(outputDir, `${generateShortHash(name)}.json`),
        JSON.stringify(report),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
          } else {
            console.log("File written successfully!");
          }
        }
      );
    })
  );
});

function extractFailure(failure) {
  const failureArray = [];
  if (failure?.message) {
    failureArray.push(failure?.message);
  }
  if (failure?._) {
    failureArray.push(failure?._);
  }
  if (Array.isArray(failure)) {
    let failureItem;
    for (let i = 0; i < failure.length; i++) {
      if (typeof failure[i] === "object" && failure[i] !== null) {
        failureItem = failure[i];
        break;
      }
    }
    return extractFailure(failureItem);
  }
  return failureArray;
}

function mergeFailuresIntoMessage(failuresArray) {
  if (!failuresArray) {
    return;
  }
  if (failuresArray.length === 0) {
    return;
  }
  return {
    message: failuresArray.join(", "),
  };
}

function secondsToMilliseconds(seconds) {
  return Math.round(seconds * 1000);
}

async function getInstanceMap(xmlInput) {
  const instances = new Map();
  const parsedXMLInput = await parseStringPromise(xmlInput, {
    explicitArray: false,
    mergeAttrs: true,
  });

  if (!parsedXMLInput) {
    error("Failed to parse XML input");
    return new Map();
  }

  const testsuites = ensureArray(parsedXMLInput.testsuites.testsuite);

  const groupId = parsedXMLInput.testsuites.name;

  testsuites.forEach((suite) => {
    const suiteJson = createSuiteJson(suite, groupId);
    const fileNameHash = generateShortHash(suite?.name ?? "");
    instances.set(fileNameHash, suiteJson);
  });

  return instances;
}

function createSuiteJson(suite, groupId) {
  const startTime = new Date(suite?.timestamp ?? "");
  const durationMillis = timeToMilliseconds(suite?.time);
  const endTime = new Date(startTime.getTime() + durationMillis);
  const testcases = ensureArray(suite.testcase);

  let accTestTime = 0;

  const suiteJson = {
    groupId,
    spec: getSpec(suite),
    worker: {
      workerIndex: 1,
      parallelIndex: 1,
    },
    startTime: startTime.toISOString(),
    results: {
      stats: {
        suites: 1,
        tests: parseInt(suite.tests ?? "0"),
        passes: testcases?.filter((tc) => !tc?.failure).length,
        pending: 0,
        skipped: 0,
        failures: testcases?.filter((tc) => tc?.failure).length,
        flaky: 0,
        wallClockStartedAt: startTime.toISOString(),
        wallClockEndedAt: endTime.toISOString(),
        wallClockDuration: durationMillis,
      },
      tests: testcases?.map((test) => {
        accTestTime += timeToMilliseconds(testcases[0]?.time);
        return getTestCase(test, suite, accTestTime);
      }),
    },
  };

  return suiteJson;
}

function getTestCase(testCase, suite, time) {
  const failures = ensureArray(testCase.failure);
  const hasFailure = failures.length > 0;

  return {
    _t: getTimestampValue(suite?.timestamp ?? ""),
    testId: generateTestId(
      getTestTitle(testCase.name, suite.name).join(", "),
      getSpec(suite)
    ),
    title: getTestTitle(testCase.name, suite.name),
    state: hasFailure ? "failed" : "passed",
    isFlaky: getTestFlakiness(),
    expectedStatus: hasFailure ? "skipped" : "passed",
    timeout: getTimeout(),
    location: getTestCaseLocation(suite?.file ?? ""),
    retries: getTestRetries(failures),
    attempts: getTestAttempts(testCase, failures, suite.timestamp ?? "", time),
  };
}

function ensureArray(value) {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function getTimestampValue(timestamp) {
  if (!isValidDate(timestamp)) {
    return 0;
  }
  return new Date(timestamp).getTime();
}

function isValidDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function getTestTitle(testName, suiteName) {
  return [suiteName, testName].filter(Boolean);
}

function timeToMilliseconds(time) {
  return secondsToMilliseconds(parseFloat(time ?? "0"));
}

function getSpec(suite) {
  return suite.file ?? suite.name ?? "No spec";
}

function getTestFlakiness() {
  // The attempts concept has not been seen in the JUnit frameworks we tried so there's always a single attempt
  // No way to determine flakiness so far
  return false;
}

function getTimeout() {
  // No timeout property has been found in the example frameworks
  // The only way to determine a timeout is looking in the failure but is not very consistent way
  return 0;
}

function getTestCaseLocation(fileName) {
  // No way to determine column and line properties of a test in spec file
  return {
    column: 1,
    file: fileName,
    line: 1,
  };
}

function getTestRetries(failures) {
  // We can know the retries based on the failure tags in testcase
  // But if the final outcome of the retries is passed, then all the failure tags will be gone
  let retries = 0;
  failures.forEach((item) => {
    if (typeof item !== "string") {
      retries++;
    }
  });
  return retries;
}

function getTestAttempts(testCase, failures, suiteTimestamp, time) {
  const testCaseTime = timeToMilliseconds(testCase.time);
  if (failures.length === 0) {
    return [
      {
        _s: "passed",
        attempt: 0,
        workerIndex: 1,
        parallelIndex: 1,
        startTime: suiteTimestamp,
        steps: [],
        duration: testCaseTime,
        status: "passed",
        stdout: getStdOut(testCase?.["system-out"]),
        stderr: [],
        errors: [],
        error: undefined,
      },
    ];
  }

  return failures.reduce((acc, item, index) => {
    if (item !== "true" && item !== "false") {
      const errors = getErrors(item);
      acc.push({
        _s: "failed",
        attempt: index,
        workerIndex: 1,
        parallelIndex: 1,
        startTime: getTestStartTime(time, suiteTimestamp),
        steps: [],
        duration: testCaseTime,
        status: "passed",
        stdout: getStdOut(testCase?.["system-out"]),
        stderr: getStdErr(testCase?.["system-err"]),
        errors: errors,
        error: errors ? errors[0] : undefined,
      });
    }
    return acc;
  }, []);
}

function getStdOut(systemOut) {
  return systemOut ? [systemOut] : [];
}

function getStdErr(systemErr) {
  return systemErr ? [systemErr] : [];
}

function getErrors(failure) {
  if (failure === "true" || failure === "false") {
    return [];
  }

  const error =
    typeof failure === "string"
      ? { message: failure }
      : { message: failure.message, stack: failure._, value: failure.type };

  return [error];
}

function getTestStartTime(accTestTime, suiteTimestamp) {
  const newStartTime = new Date(suiteTimestamp).getTime() + accTestTime;
  return new Date(newStartTime).toISOString();
}
