pipeline {
  agent any
  stages {
    stage('install') {
      parallel {
        stage('core') {
          steps {
            sh '''cd core
npm install'''
          }
        }
        stage('webb') {
          steps {
            sh '''cd webb
npm install'''
          }
        }
      }
    }
    stage('test') {
      parallel {
        stage('core') {
          steps {
            sh '''cd core
npm run test'''
          }
        }
        stage('webb') {
          steps {
            sh '''cd webb
npm run test'''
          }
        }
      }
    }
    stage('lint') {
      parallel {
        stage('core') {
          steps {
            sh '''cd core
npm run lint'''
          }
        }
        stage('webb') {
          steps {
            sh '''cd webb
npm run lint'''
          }
        }
      }
    }
    stage('check vulnerabilities') {
      parallel {
        stage('core') {
          steps {
            sh '''cd core
npm audit'''
          }
        }
        stage('webb') {
          steps {
            sh '''cd webb
npm audit'''
          }
        }
      }
    }
  }
}