# Visual Testing with Argos

This directory demonstrates integrating **Argos** visual testing with Currents.

## Workflows

| Workflow | Description |
| :--- | :--- |
| [`argos-example.yml`](../.github/workflows/argos-example.yml) | Run tests with Argos visual regression |

## How it works

1.  Tests generate screenshots.
2.  Currents Orchestration hook (`onFinish`) uploads screenshots to Argos.
3.  Argos compares screenshots with baseline.

## Configuration
- Tests are located in this directory (`argos`).
- `currents.config.ts`: Includes the `onFinish` hook to trigger `argos upload`.
