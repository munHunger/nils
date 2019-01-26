pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh '''cd core
npm install'''
        sh '''cd webb
npm install'''
      }
    }
    stage('test') {
      steps {
        sh '''cd core
npm run test'''
      }
    }
    stage('lint') {
      steps {
        sh '''cd core
npm run lint'''
        sh '''cd webb
npm run lint'''
      }
    }
    stage('check vulnerabilities') {
      steps {
        sh '''cd core
npm audit'''
        sh '''cd webb
npm audit'''
      }
    }
  }
}