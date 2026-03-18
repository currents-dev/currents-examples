# currents-playwright-pnpm-example

An example repository for setting up Currents + Chromatic and run Playwright tests on GitHub Actions

### Setup

```sh
pnpm install
```

### Run tests locally

Set your own `CURRENTS_RECORD_KEY` and `CURRENTS_PROJECT_ID`:

```sh
CURRENTS_RECORD_KEY=xxx CURRENTS_PROJECT_ID=yyy pnpm exec pwc-p
```

GitHub Actions:

- Set `CURRENTS_RECORD_KEY` and `CHROMATIC_PROJECT_TOKEN` [repository secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- Set Currents project id in `currents.config.ts:config.projectId` in `currents.config.ts`

Check out a GitHub Actions [example build](https://github.com/currents-dev/currents-playwright-pnpm-example/actions/runs/13893721273).

### Configuration Notes

- [Currents Reporter](https://docs.currents.dev/resources/reporters/currents-playwright) is configured in playwright.config.ts
- pwc-p runs Playwright using [Currents Orchestration](https://docs.currents.dev/guides/parallelization-guide/pw-parallelization/playwright-orchestration)
- Chromatic collects the visual testing artifacts as a [separate GHA job](https://github.com/currents-dev/currents-playwright-pnpm-example/blob/60499037a5674ea3fd6082e9664fb9968cc442f4/.github/workflows/integration.yml#L73)
