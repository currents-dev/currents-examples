# Currents Actions with Playwright

[Currents Actions](https://docs.currents.dev/guides/currents-actions) let you define rules that automatically **skip**, **quarantine**, or otherwise modify test behavior — without touching test code. Rules are created in the Currents dashboard and applied at runtime via Playwright fixtures.

## Prerequisites

- A [Currents](https://app.currents.dev) account with a project
- Your **Record Key** and **Project ID** (from project settings)

## 1. Install

```bash
npm install
```

## 2. Configure credentials

Set environment variables — no edits to config files needed:

```bash
export CURRENTS_RECORD_KEY=your_record_key
export CURRENTS_PROJECT_ID=your_project_id
```

`currents.config.ts` reads these and passes them to both the reporter and the fixtures:

```ts
export default {
  recordKey: process.env.CURRENTS_RECORD_KEY || "",
  projectId: process.env.CURRENTS_PROJECT_ID || "",
};
```

## 3. Wire Currents fixtures

Extend Playwright's `test` with Currents fixtures so Actions are applied at runtime:

```ts
// basic/test.ts
import {
  CurrentsFixtures,
  CurrentsWorkerFixtures,
  fixtures,
} from "@currents/playwright";
import { test as base } from "@playwright/test";

export const test = base.extend<CurrentsFixtures, CurrentsWorkerFixtures>({
  ...fixtures.baseFixtures,
  ...fixtures.actionFixtures,
});
```

Then use this `test` instead of Playwright's built-in one in your spec files.

Read more about [Playwright fixtures](https://playwright.dev/docs/test-fixtures).

## 4. Run tests

```bash
npx playwright test
```

This runs your tests, applies any matching Currents Actions, and reports results to the dashboard.

## 5. Create Actions in the dashboard

Go to your project in the [Currents dashboard](https://app.currents.dev) and create rules. Each rule matches tests by criteria (file name, title, tag, etc.) and applies an action (Skip or Quarantine).

See the [Actions documentation](https://docs.currents.dev/guides/currents-actions) for the full rule builder reference.

![actions-show](https://github.com/user-attachments/assets/24b16c4a-cf77-42fd-a91d-eda8cb93e88d)

## What's in `basic/`

| File                      | What it demonstrates                                                              |
| ------------------------- | --------------------------------------------------------------------------------- |
| `test.ts`                 | Extends Playwright `test` with Currents action fixtures                           |
| `actions.spec.ts`         | A **quarantine** rule (match by file) and a **skip** rule (match by file + title) |
| `getting-started.spec.ts` | Baseline passing tests                                                            |

### Example rules from `actions.spec.ts`

**Quarantine** — match by file name:

| Field | Operation | Value             |
| ----- | --------- | ----------------- |
| File  | is        | `actions.spec.ts` |

→ Action: **Quarantine** (test runs but failure is suppressed)

**Skip** — match by file name AND test title:

| Field | Operation | Value              |
| ----- | --------- | ------------------ |
| File  | is        | `actions.spec.ts`  |
| Title | is        | `action skip test` |

→ Action: **Skip** (test is not executed)
