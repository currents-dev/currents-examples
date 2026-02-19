# Reference

`config.json` reference

```json
{
  "framework": "junit", // This is mandatory
  "frameworkVersion": "11.10.0", // Your framework's version
  "cliArgs": {
    "options": {
      "jUnitFile": "postman-tests-example/tests.xml" // This is mandatory and must point to the JUnit XML file with the tests results
    },
    "args": []
  },
  "frameworkConfig": {
    "originFramework": "postman", // This is your framework's name
    "originFrameworkVersion": "11.10.0" // This is your framework's version
  }
}
```
