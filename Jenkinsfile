pipeline {
  agent any
  stages {
    stage('install core') {
      steps {
        sh '''cd core
npm install'''
      }
    }
    stage('test') {
      steps {
        sh '''cd core
npm run test'''
      }
    }
  }
}