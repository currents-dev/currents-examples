# Currents.dev - Jenkins Playwright Last Failed Example

This is an example repository that showcases using [Currents.dev](https://currents.dev) for running Playwright tests on Jenkins with the last failed flag.


- Note: get your record key from [Currents.dev](https://app.currents.dev) and set [Jenkins credential](https://www.jenkins.io/doc/book/security/credentials/) variable `CURRENTS_RECORD_KEY`

- Note: set the `CURRENTS_PROJECT_ID` [Jenkins credential](https://www.jenkins.io/doc/book/security/credentials/) variable - obtain the project id from [Currents.dev](https://app.currents.dev)

- Note: set the `CURRENTS_API_KEY` [Jenkins credential](https://www.jenkins.io/doc/book/security/credentials/) variable - obtain the API Key from [Currents.dev](https://app.currents.dev)


# Jenkins Setup

The following plugins are needed (You can find it with the same names):
- Github Plugin
- Pipeline Plugin
- SCM Api Plugin