pipeline {
  agent any
  stages {
    stage('install core') {
      steps {
        sh '''cd core
npm install'''
      }
    }
    stage('test & lint') {
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
    stage('check vulnerabilities') {
      steps {
        sh '''cd core
npm audit'''
      }
    }
  }
}