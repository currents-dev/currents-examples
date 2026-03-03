pipeline {
    agent any
    parameters {
        string(name: 'CI_BUILD_ID', defaultValue: 'none', description: 'Set this value if you want to execute only the failed tests from a specific run')
        booleanParam(name: 'IS_ORCHESTRATION', defaultValue: false, description: 'Set this value if you want to execute an orchestrated run')
    }
    environment {
        CURRENTS_PROJECT_ID = credentials('CURRENTS_PROJECT_ID')
        CURRENTS_RECORD_KEY = credentials('CURRENTS_RECORD_KEY')
        CURRENTS_CI_BUILD_ID = "reporter-${JOB_NAME}-${BUILD_ID}-${BUILD_NUMBER}"
        CURRENTS_API_KEY = credentials('CURRENTS_API_KEY')
        TOTAL_SHARDS = 3
        PARALLEL_JOBS = 4
    }
    options {
        timeout(time: 60, unit: 'MINUTES')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install'
                sh 'rm -rf test-results'
                sh 'rm -rf .last-run.json'
            }
        }

        stage('Set params CI Build ID') {
            steps {
                script {
                    env.CI_BUILD_ID = "${params.CI_BUILD_ID}"
                    echo "CI_BUILD_ID is set to: ${params.CI_BUILD_ID}"
                }
                echo "Verify values: ${env.CI_BUILD_ID} ${params.IS_ORCHESTRATION}"
            }
        }

        stage('Run Tests decision') {
            steps {
                runTestsDecision(env.CI_BUILD_ID, params.IS_ORCHESTRATION)
            }
        }
    }
}

def runTestsDecision(ciBuildId, isOrchestration) {
    if (ciBuildId && ciBuildId != 'none') {
        stage('Run Tests with last failed') {
            script {
                echo "Running tests with last failed: ${ciBuildId} ${env.TOTAL_SHARDS}"
                script {
                    sh "npx currents api get-run --api-key ${env.CURRENTS_API_KEY} --project-id ${env.CURRENTS_PROJECT_ID} --ci-build-id ${env.CI_BUILD_ID} --pw-last-run --output .last-run.json"
                    sh 'cat .last-run.json'
                }
                if (isOrchestration && isOrchestration == true) {
                    runPlaywrightOrchestration(env.PARALLEL_JOBS.toInteger(), true)
                } else {
                    runPlaywrightSharded(env.TOTAL_SHARDS.toInteger(), true)
                }
            }
        }
    } else {
        stage('Run Tests') {
            script {
                echo 'Running tests'
                if (isOrchestration && isOrchestration == true) {
                    runPlaywrightOrchestration(env.PARALLEL_JOBS.toInteger(), false)
                } else {
                    runPlaywrightSharded(env.TOTAL_SHARDS.toInteger(), false)
                }
            }
        }
    }
}

def runPlaywrightSharded(shardTotal, lastFailed) {
    def parallelStages = [:]
    for (int i = 1; i <= shardTotal; i++) {
        def shardIndex = i
        parallelStages["shard${shardIndex}"] = {
            if (lastFailed) {
                sh "mkdir -p test-results/shard-${shardIndex}"
                sh "cp .last-run.json test-results/shard-${shardIndex}/.last-run.json"
                runPlaywrightTestsLastFailed(shardIndex, shardTotal)
            } else {
                runPlaywrightTests(shardIndex, shardTotal)
            }
        }
    }
    parallel parallelStages
}

def runPlaywrightTests(shardIndex, shardTotal) {
    stage("Run Playwright Tests - Shard ${shardIndex}") {
        script {
            def command = "npx pwc --shard=${shardIndex}/${shardTotal}"
            echo "Running command: ${command}"
            sh "${command}"
        }
    }
}

def runPlaywrightTestsLastFailed(shardIndex, shardTotal) {
    stage("Run Playwright Tests - Shard ${shardIndex}") {
        script {
            def command = "npx pwc --shard=${shardIndex}/${shardTotal} --last-failed --output test-results/shard-${shardIndex}"
            echo "Running command: ${command}"
            sh "${command}"
        }
    }
}

def runPlaywrightOrchestration(parallelTotal, lastFailed) {
    def parallelStages = [:]
    for (int i = 1; i <= parallelTotal; i++) {
        def parallelIndex = i
        parallelStages["parallel${parallelIndex}"] = {
            if (lastFailed) {
                sh "mkdir -p test-results/parallel-${parallelIndex}"
                sh "cp .last-run.json test-results/parallel-${parallelIndex}/.last-run.json"
                runPlaywrightTestsLastFailedOrchestration(parallelIndex)
            } else {
                runPlaywrightTestsOrchestration(parallelIndex)
            }
        }
    }
    parallel parallelStages
}

def runPlaywrightTestsOrchestration(parallelIndex) {
    stage("Run Playwright Tests - Orchestration ${parallelIndex}") {
        script {
            def command = 'npx pwc-p'
            echo "Running command: ${command}"
            sh "${command}"
        }
    }
}

def runPlaywrightTestsLastFailedOrchestration(parallelIndex) {
    stage("Run Playwright Tests - Orchestration ${parallelIndex}") {
        script {
            def command = "npx pwc-p --last-failed --output test-results/parallel-${parallelIndex}"
            echo "Running command: ${command}"
            sh "${command}"
        }
    }
}
