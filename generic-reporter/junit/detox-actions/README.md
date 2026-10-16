# Detox JUnit + Currents Actions

Quarantine flaky Detox or Jest tests reported as JUnit XML, without losing their results. `currents run upload` (`@currents/cmd` 2.3.0 or later) applies the project's [Currents Actions](https://docs.currents.dev/guides/currents-actions) to the results before it uploads them:

- **Each attempt keeps its result.** A quarantined test shows as ignored, but each attempt keeps its `failed` status, its error and its own video, screenshot or log.
- **Quarantined tests don't fail CI.** `--fail-on-failures` exits with 1 only when a test failed that no action quarantined or skipped. The CI job no longer needs to fetch the actions and apply them itself, and the JUnit report no longer needs `<skipped/>`.
- **You can see when a test is fixed.** Quarantine applies to failed results only. When the test passes again, it shows as passed, and its history in Currents shows the change.

## The example

| Report            | `shows the balance`                           | `loads the history` | Upload exits with |
| ----------------- | --------------------------------------------- | ------------------- | ----------------- |
| `junit.xml`       | failed on both attempts, so it is quarantined | passed              | 0                 |
| `junit-fixed.xml` | passed, so the action leaves it alone         | passed              | 0                 |

Without the quarantine action, uploading `junit.xml` exits with 1 and names `shows the balance`.

In `junit.xml`, the test that failed twice has one `<failure>` per attempt, and the upload makes an attempt of each. Each attempt's device log is attached with `currents.artifact.attempt.<index>.*` properties. Index 0 is the first attempt. Attach videos and screenshots the same way, with `type` `video` or `screenshot`. See [artifacts](https://docs.currents.dev/resources/reporters/currents-cmd/currents-convert#artifacts).

## Create the action

In the Currents project, open **Actions** and create **Quarantine the balance test**:

- action: _Quarantine_
- conditions: _Test Title_ is `shows the balance` and _File_ is `e2e/wallet.test.js`

The upload applies the actions of the project the results are uploaded to. It doesn't apply actions with regex or date conditions yet.

## Upload

```sh
npm install
export CURRENTS_PROJECT_ID=<project-id>
export CURRENTS_RECORD_KEY=<record-key>

npm run report        # shows the balance is quarantined, the command exits with 0
npm run report:fixed  # shows the balance passed
```

Both scripts run:

```sh
currents run upload --input-format=junit --input-file=<report> --framework=node --fail-on-failures
```

The command prints `Actions: 0 tests skipped, 1 quarantined, 0 tagged` and the link to the run. In the run, `shows the balance` is ignored, its Insights say _Quarantine applied … ignoring test with status Failed_, and both failed attempts have their error and device log.

## In GitHub Actions

Let the tests finish without failing the job, then let the upload fail it:

```yaml
- name: Run the tests
  run: npx detox test --configuration android.att.release --retries 1 --headless || true

- name: Upload the results to Currents
  if: ${{ !cancelled() }}
  env:
    CURRENTS_PROJECT_ID: <project-id>
    CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
  run: npx currents run upload --input-format=junit --input-file="reports/*.xml" --framework=node --fail-on-failures
```

`|| true` keeps a failed test from stopping the job before the upload. The upload step then fails the job only for failures that no action quarantined.
