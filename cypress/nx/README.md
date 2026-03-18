# currents-nx-example

Example of using [`@currents/nx`](https://www.npmjs.com/package/@currents/nx) plugin for integrating cypress with alternative orchestration services - [Currents](https://currents.dev) and [Sorry Cypress](https://sorry-cypress.dev)

## Walkthrough

[`@currents/nx`](https://github.com/currents-dev/currents-nx/tree/main) is an NX plugin that runs cypress tests with the provided configuration options while using alternative orchestration services.

You can recreate the example following the next steps.

```sh

# Create an "empty" workspace
npx create-nx-workspace@latest currents-nx-example
cd currents-nx-example

# Create a dummy web project, choose any CSS styling
# That will create a new project with `@nrwl/cypress` pre-installed and configured
npm i -D @nx/web
nx g @nx/web:app frontend

# Install @currents/nx
npm i -D @currents/nx

# Configure a new target in apps/frontend-e2e/project.json
vim apps/frontend-e2e/project.json
```

Set executor value to `"@currents/nx:currents"`

```json
{
  "executor": "@currents/nx:currents",
  "options": {
    "record": true,
    "parallel": true,
    "cypressConfig": "apps/app-e2e/cypres.config.ts",
    "devServerTarget": "my-react-app:serve",
    "testingType": "e2e"
  }
}
```

- Get `projectId` and `recordKey` from https://app.currents.dev
- Update the projectId in `cypress.config.js` file
- Set the key either in configuration or as CLI flag

Now you can start recording your tests to Currents or Sorry Cypress.

```sh
nx run frontend-e2e:currents --record --key <key> --ci-build-id hello-currents-nx
```

While having those options defined, you can omit the corresponding CLI flags:

```sh
nx run frontend-e2e:currents  --ci-build-id hello-currents-nx-001
```

### Misc

- Learn more about [Parallelizing Cypress](https://currents.dev/readme/guides/parallelization) tests
- Explore how to use [CI Build ID](https://currents.dev/readme/guides/cypress-ci-build-id) to organize your builds

Here's a visual example of this demo project sending the results to Currents dashboard

![Kapture 2021-11-19 at 01 14 50](https://user-images.githubusercontent.com/1637928/142597762-3cc0009f-d030-46aa-b273-1c31300c65f6.gif)
