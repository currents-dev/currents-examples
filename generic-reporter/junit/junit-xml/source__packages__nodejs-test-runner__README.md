# NodeJS Test Runner + Currents

## How to

Follow the steps to reproduce this example:

- Create an account at https://app.currents.dev and obtain Project Id and Record Key
- Get a Record key and Project ID from Currents dashboard
- Run the test

```sh
npm run test
```

- Convert JUnit test results to Currents-compatible format

```sh
npm run convert
```

- Upload the results to Currents

```sh
npx currents upload --key=your-record-key --project-id=currents-project-id
```

## Resources

- 📖 [Currents documentation](https://docs.currents.dev)
- [`Github actions example`](https://github.com/currents-dev/currents-nodejs-github-actions-example)
- [`@currents/cmd`](https://docs.currents.dev/resources/reporters/currents-cmd)
- [`@currents/node-test-reporter`](https://docs.currents.dev/resources/reporters/currents-node-test-reporter)
