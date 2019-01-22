pipeline {
  agent any
  stages {
    stage('install core') {
      steps {
        sh '''cd core
npm install'''
      }
    }
    stage('test core') {
      parallel {
        stage('test core') {
          steps {
            sh '''cd core
npm run test'''
          }
        }
        stage('lint core') {
          steps {
            sh '''cd core
npm run lint'''
          }
        }
      }
    }
  }
}