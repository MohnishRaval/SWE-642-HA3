pipeline {
   environment {
        registryCredential = 'dockerhub'
        DB_URL=credentials('DB_URL')
        DB_PASSWORD=credentials('DB_PASSWORD')
        DB_USER=credentials('DB_USER')
        TIMESTAMP = new Date().format("yyyyMMdd_HHmmss")
    }
   agent any
   tools {
    maven 'Maven 3.6.3'
}

   stages {
    stage('Maven Clean') {
            steps {
               script{
                sh 'mvn clean'
               }
            }
        }
        stage('Maven Install') {
            steps {
               script{
                sh 'mvn install'
            }
            }
        }
      stage('Build Docker Image') {
         steps {
            script{
               docker.withRegistry('',registryCredential){
                  def customImage = docker.build("19982707/swe-assignment-3:${env.TIMESTAMP}")
               }
            }
         }
      }

      stage('Push Image to Dockerhub') {
         steps {
            script{
               docker.withRegistry('',registryCredential){
                  sh "docker push 19982707/swe-assignment-3:${env.TIMESTAMP}"
               }
            }
         }
      }
      stage('Deploying to Rancher to single node(deployed in 3 replicas)') {
         steps {
            script{
               sh "kubectl set image deployment/springdeployment container-0=19982707/swe-assignment-3:${env.TIMESTAMP} -n default"
            }
         }
      }
   }
}