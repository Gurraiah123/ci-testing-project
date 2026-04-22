pipeline {

    agent any

    tools {
        nodejs "Node20"
    }

    environment {
        SONAR_SERVER = "sonar-server"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/Gurraiah123/ci-testing-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Unit + Integration Tests') {
            steps {
                sh 'npm run test:ci'
            }
        }

        stage('Archive Test Reports') {
            steps {
                junit 'reports/junit.xml'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t node-ci-demo .'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONAR_SERVER}") {
                    sh '''
                    npx sonar-scanner
                    '''
                }
            }
        }

        stage('Quality Gate Check') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

    }

    post {

        always {
            archiveArtifacts artifacts: 'coverage/**', fingerprint: true
        }

        success {
            echo "Pipeline completed successfully ✅"
        }

        failure {
            echo "Pipeline failed ❌"
        }

    }

}
