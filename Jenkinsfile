pipeline {
  agent any
      tools {
       jdk 'jdk17'
       nodejs 'node24'
    }

  environment {
    DOCKER_HUB_USER = "mahesraj"                 // Updated Docker Hub username
    IMAGE_NAME = "yesmechanicpartner"            // Updated project name
    IMAGE_TAG = "v${BUILD_NUMBER}"               // Tag based on Jenkins build number
    FULL_IMAGE_NAME = "${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"  // Full image name
  }

  stages {
    stage('Checkout Code') {
      steps {
        // Pull the latest code from the specified GitHub repo and branch
        git branch: 'main', url: 'https://github.com/Mahes-raj/Yes-mechanic-partner.git'
      }
    }
       stage('SonarQube Code Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh  “$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Yes-mechanic-partner/ -Dsonar.projectkey=Yes-mechanic-partner”
                }
            }
        }
        stage ('quality gate'){
          steps {
              script {
                  waitForQualityGate abortPipeline:false, credentialsId:'Sonar1-token'
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
          // Build the Docker image using the Dockerfile in the project
          dockerImage = docker.build("${FULL_IMAGE_NAME}", "--no-cache .")
        }
      }
    }

    stage('Push Docker Image to DockerHub') {
      steps {
        script {
          // Push the built Docker image to Docker Hub
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
            dockerImage.push()
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          // Replace the image in k8s-deployment.yaml with the newly built image
          sh '''
            sed -i 's|image: .*|image: '"$FULL_IMAGE_NAME"'|' k8s-deployment.yaml
            kubectl apply -f k8s-deployment.yaml --validate=false
            kubectl rollout status deployment/yesmechanicpartner
          '''
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


