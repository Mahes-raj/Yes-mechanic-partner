pipeline {
  agent any

  tools {
    jdk 'jdk17'
    nodejs 'node24'
  }

  environment {
    DOCKER_HUB_USER = "mahesraj"
    IMAGE_NAME = "yesmechanicpartner"
    IMAGE_TAG = "v${BUILD_NUMBER}"
    FULL_IMAGE_NAME = "${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
  }

  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/Mahes-raj/Yes-mechanic-partner.git'
      }
    }

    stage('SonarQube Code Analysis') {
      steps {
        withSonarQubeEnv('sonar-server') {
          withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
            sh """
              $SCANNER_HOME/bin/sonar-scanner \\
                -Dsonar.projectKey=yesmechanicpartner \\
                -Dsonar.projectName=Yes-mechanic-partner \\
                -Dsonar.sources=. \\
                -Dsonar.host.url=http://<SONAR_HOST>:9000 \\
                -Dsonar.login=${SONAR_TOKEN}
            """
          }
        }
      }
    }

    stage('Quality Gate') {
      steps {
        script {
          waitForQualityGate abortPipeline: false
        }
      }
    }

    stage('Install NPM dependencies') {
      steps {
        sh "npm install"
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${FULL_IMAGE_NAME}", "--no-cache .")
        }
      }
    }

    stage('Push Docker Image to DockerHub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
            dockerImage.push()
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          sh """
            sed -i 's|image: .*|image: ${FULL_IMAGE_NAME}|' k8s-deployment.yaml
            kubectl apply -f k8s-deployment.yaml --validate=false
            kubectl rollout status deployment/yesmechanicpartner
          """
        }
      }
    }
  }

  post {
    success {
      echo "Deployment successful"
    }
    failure {
      echo "Deployment failed"
    }
  }
}

