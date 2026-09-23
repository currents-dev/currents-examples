# Detox + Jest + Currents

A small React Native app with Detox tests that report to [Currents](https://currents.dev) through [`@currents/jest`](https://www.npmjs.com/package/@currents/jest) and [`currents upload`](https://www.npmjs.com/package/@currents/cmd). Each run in Currents shows:

- a video and a screenshot of every failed attempt, and the device logs of every attempt
- the attempts of `detox test --retries` merged into one test: a test that fails on the first run and passes on the rerun is marked flaky
- `detox.trace.json`, attached to the first test of each spec file

The tests fail and flake on purpose:

| Test                                          | Result                                      |
| --------------------------------------------- | ------------------------------------------- |
| `Sign in` - both tests                        | Pass                                        |
| `Counter` - `counts taps`, `resets the count` | Pass                                        |
| `Counter` - `counts to ten`                   | Fails on every run                          |
| `Sign out` - `returns to the sign in screen`  | Fails on the first run, passes on the rerun |

Android only. The same setup works for iOS: add an iOS app and device to `.detoxrc.js`.

## What Currents needs

1. Install the packages. Detox support is in the `beta` versions for now:

   ```sh
   npm install --save-dev @currents/jest@beta @currents/cmd@beta
   ```

2. Add the reporter next to the Detox reporter in `e2e/jest.config.js`:

   ```js
   reporters: ['detox/runners/jest/reporter', '@currents/jest'],
   ```

3. Record logs, screenshots and videos in `.detoxrc.js`. Logs also make Detox write `detox.trace.json`:

   ```js
   artifacts: {
     plugins: {
       log: 'all',
       screenshot: 'failing',
       video: 'failing',
     },
   },
   ```

4. Upload the results after `detox test` exits:

   ```sh
   npx detox test --configuration android.emu.release --retries 1
   npx currents upload --project-id <project id> --key <record key>
   ```

## Run it locally

You need the [Detox environment for Android](https://wix.github.io/Detox/docs/introduction/environment-setup): JDK 17, the Android SDK and an emulator. Set `DETOX_AVD_NAME` to the name of your emulator (default: `Pixel_7_API_34`).

```sh
npm install
npm run build:android
npm run test:android
npx currents upload --project-id <project id> --key <record key>
```

## Run it in GitHub Actions

[`.github/workflows/jest-detox.yml`](../../../.github/workflows/jest-detox.yml) builds the app, starts an emulator with [`reactivecircus/android-emulator-runner`](https://github.com/ReactiveCircus/android-emulator-runner), runs the tests with `--retries 1` and uploads the results. Set the `CURRENTS_RECORD_KEY` secret and the `CURRENTS_PROJECT_ID` value to your own.

The workflow also sets the commit details of pull request runs. On `pull_request` events, GitHub checks out a merge commit that it creates, so without this step Currents shows the commit message as `Merge <sha> into <sha>`. The step reads the last commit of the pull request and passes it to `currents upload` through the `COMMIT_INFO_*` variables:

```yaml
- name: Use the pull request commit for Currents
  if: ${{ !cancelled() && github.event_name == 'pull_request' }}
  env:
    HEAD_SHA: ${{ github.event.pull_request.head.sha }}
    HEAD_REF: ${{ github.event.pull_request.head.ref }}
  run: |
    git fetch --depth=1 origin "$HEAD_SHA"
    # A random delimiter: a commit message line equal to a fixed one would end the
    # value early and add the lines after it as variables.
    delimiter="EOF_$(openssl rand -hex 16)"
    {
      echo "COMMIT_INFO_SHA=$HEAD_SHA"
      echo "COMMIT_INFO_BRANCH=$HEAD_REF"
      echo "COMMIT_INFO_AUTHOR=$(git log -1 --format=%an "$HEAD_SHA")"
      echo "COMMIT_INFO_EMAIL=$(git log -1 --format=%ae "$HEAD_SHA")"
      echo "COMMIT_INFO_MESSAGE<<$delimiter"
      git log -1 --format=%B "$HEAD_SHA"
      echo "$delimiter"
    } >> "$GITHUB_ENV"
```
