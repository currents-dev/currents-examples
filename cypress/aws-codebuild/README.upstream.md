# Currents.dev - AWS CodeBuild Example

The full guide: https://currents.dev/readme/ci-setup/aws-code-build

This is an example repository that showcases using [Currents.dev](https://currents.dev) for running parallel cypress tests using AWS CodeBuild CI

The example [buildspec.yml](https://github.com/currents-dev/aws-codebuild-example/blob/main/buildspec.yml) defines a configuration for running cypress tests in parallel mode using 3 workers in [matrix mode](https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html#batch_build_matrix). The example is designed to be executed within a [batch build](https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html).

- Note: The example uses [CODEBUILD_INITIATOR](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html) as a [CI Build ID](https://currents.dev/readme/guides/cypress-ci-build-id). When testing interactively, the CODEBUILD_INITIATOR will be set to the username of the build initiator. When running a batched build, the variable will have the batch build id.

- Note: get your record key from [Currents.dev](https://app.currents.dev) and set [AWS CodeBuild Environment Variable](https://docs.aws.amazon.com/codebuild/latest/userguide/change-project-console.html#change-project-console-environment) variable `CURRENTS_RECORD_KEY`

- Note: set the `projectId` in `currents.config.js` - obtain the project id from [Currents.dev](https://app.currents.dev)

- Note: use CLI arguments to customize your cypress-cloud runs, e.g.: `npx cypress-cloud run --parallel --record --key <your currents.dev key> --group groupA`
