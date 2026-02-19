pipeline {
  agent {
    // this image provides everything needed to run Playwright
    docker {
      image 'mcr.microsoft.com/playwright:v1.34.0-jammy'
    }
  }

  stages {
    // installs node dependencies
    stage('build') {
      steps {
        echo "Running build ${env.BUILD_ID} on ${env.JENKINS_URL}"
        sh 'npm install playwright @currents/plawyright'
      }
    }

    // this stage runs Playwright tests, and each agent uses the workspace
    // from the previous stage
    stage('Playwright parallel tests') {
      environment {
        // see https://jenkins.io/doc/book/using/using-credentials/
        CURRENTS_RECORD_KEY = credentials('currents-record-key')
        CURRENTS_PROJECT_ID = credentials('currents-project-id')
      }

      // Run parallel workers, see:
      // https://jenkins.io/doc/book/pipeline/syntax/#parallel
      parallel {
        // each worker is running the same command, 
        stage('tester A') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npx pwc --key ${env.CURRENTS_RECORD_KEY} --project-id ${env.CURRENTS_RECORD_KEY} --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID} --shard 1/2 --output test-results/shard-1"
          }
        }

        // second tester runs the same command
        stage('tester B') {
          steps {
            echo "Running build ${env.BUILD_ID}"
            sh "npx pwc --key ${env.CURRENTS_RECORD_KEY} --project-id ${env.CURRENTS_RECORD_KEY} --ci-build-id ${env.BRANCH_NAME}-${env.BUILD_ID} --shard 2/2 --output test-results/shard-2"
          }
        }
      }

    }
  }
}