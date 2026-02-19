# Currents Playwright NX Example

This repository shows how to use NX + Playwright with Currents.

## Setup

```sh
npm i -g nx@latest
npm i
```

## Run

The repo has two projects and each has its own tests.

```sh
CURRENTS_RECORD_KEY=recordkey \
CURRENTS_PROJECT_ID=projectid \
CURRENTS_CI_BUILD_ID=`date +%s` \
nx run-many -t e2e  --parallel=2 --verbose

# ...

 NX   Running target e2e for 2 projects

   →  Executing 2/2 remaining tasks in parallel...

   ⠙  nx run e2e-01:e2e
   ⠙  nx run e2e-02:e2e

# ...

 NX   Ran target e2e for 2 projects (8s)

   ✔  1/2 succeeded [0 read from cache]

   ✖  1/2 targets failed, including the following:

      - nx run e2e-01:e2e
```

### Output directory

Playwright output directory is set in `project.json` > `targets.e2e.options.output`, for example:

```json
 "targets": {
    "e2e": {
      "executor": "@nx/playwright:playwright",
      "options": {
        "skipInstall": true,
        "output": "{workspaceRoot}/playwright-report/{projectName}",
        "config": "{projectRoot}/playwright.config.ts"
      }
    }
  }
```

After running the tests, results will appear as:

```plain
playwright-report/
├── e2e-01/
│   └── .last-run.json
└── e2e-02/
    └── .last-run.json
```

ℹ️ `playwright.config.ts` for each project use `nxE2EPreset` - it sets a different `output` directory, but `project.json:output` overrides it.

### Last Failed

nx passes down unrecognized arguments to the target command, for example

```sh
nx run-many -t e2e  --parallel=2 --verbose --last-failed
# ...

 NX   Ran target e2e for 2 projects (7s)

      With additional flags:
        --last-failed=true
# ...
 NX   Ran target e2e for 2 projects (7s)

      With additional flags:
        --last-failed=true

   ✔  1/2 succeeded [0 read from cache]

   ✖  1/2 targets failed, including the following:

      - nx run e2e-01:e2e
```

## Single project orchestration

The project named `e2e-03` has a different target than the other two projects. The target is `or8n`
This target project executes `pwc-p` command. When using it in multiple machines it will execute in parallel the tests of this project.

```sh
CURRENTS_RECORD_KEY=recordkey \
CURRENTS_PROJECT_ID=projectid \
CURRENTS_CI_BUILD_ID=`date +%s` \
nx run-many -t or8n

# ...

 NX   Running target or8n for 1 project

   ⠙  nx run e2e-03:or8n
```

The `parallel` flag is no longer needed as it is running a single nx project.

The `or8n.yml` file has an example for running it in Github actions.
