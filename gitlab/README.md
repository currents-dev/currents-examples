# 🎭 Currents - Playwright - GitLab CI/CD

This repo showcases [Playwright](https://playwright.dev/) integration with [Currents](https://currents.dev). The example is based on https://github.com/MarcusFelling/demo.playwright, the [basic](./basic) test scenarios.

<p align="center">
  <img width="830" src="https://static.currents.dev/currents-playwright-banner-gh.png" />
</p>

See the [`.gitlab-ci.yml`](.gitlab-ci.yml) file - it created a GitLab CI pipeline with 3 workers using 3 [Playwright Shards](https://playwright.dev/docs/test-sharding).

Example command:

```sh
npx pwc --key $CURRENTS_RECORD_KEY --project-id bnsqNa --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL
```

## Setup

- Create an account at https://app.currents.dev and grab the **Project ID** and **Record Key**.
- Add `CURRENTS_RECORD_KEY` as [GitLab CI/CD Secrets](https://docs.gitlab.com/ee/ci/variables/) (make sure it's not protected)
- [Optional] Add `CURRENTS_API_KEY` as [GitLab CI/CD Secrets](https://docs.gitlab.com/ee/ci/variables/) (only used in the examples with `npx currents api` commands)

Additional resources:

- Playwright Features on Currents: https://currents.dev/playwright
- Integration Documentation: https://currents.dev/readme/integration-with-playwright/currents-playwright
- CI Build ID Guide: https://currents.dev/readme/guides/cypress-ci-build-id

## Additional examples

- [`.gitlab-ci.yml`](.gitlab-ci.yml) - The basic 3 parrallel job sharded pipeline
- Examples of running only the failed tests when retrying a CI pipeline/job
  - For `playwright test` (with currents reporter) : [`./gitlab/ci/with-reruns-reporter.yml`](./gitlab/ci/with-reruns-reporter.yml)
  - For `pwc` : [`./gitlab/ci/with-reruns-pwc.yml`](./gitlab/ci/with-reruns-pwc.yml) 
  - For `pwc-p` (orchestration) : [`./gitlab/ci/with-reruns-pwcp.yml`](./gitlab/ci/with-reruns-pwcp.yml) 

## GitLab CI Playwright Results

The results are being reported to Currents for more efficient troubleshooting, and monitoring test suite flakiness and performance.

Currents will collect the following information:

- console output
- screenshots
- videos
- trace files
- timing
- outcomes
- flaky tests
- error details
- tags for more convenient management of the tests

### GitLab Merge Request Notes

Take a look at the example merge request: https://gitlab.com/currents.dev/gitlab-playwright-currents/-/merge_requests/3

When [GitLab integration](https://currents.dev/readme/integrations/gitlab) is enabled, Currents will post a Merge Commit note with run results:

<p align="center">
  <img width="830" src="https://static.currents.dev/currents-gitlab-merge-note.png" />
</p>

In addition, Currents will post an [External Status check](https://docs.gitlab.com/ee/user/project/merge_requests/status_checks.html) for every Playwright project configured. For example:

<p align="center">
  <img src="https://static.currents.dev/currents-gitlab-status-check.png" />
</p>

### Example of Playwright run reported to GitLab CI/CD

<a href="https://static.currents.dev/currents-gitlab-results-example.mp4">
    Video
</a>
