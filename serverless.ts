import type { AWS } from '@serverless/typescript';

import { myFunction } from './src/functions';
import Resources from './src/functions/resources';

const serverlessConfiguration: AWS = {
  // # Service name
  service: 'serv-boilerplate-sns-sqs-lambd-cw',
  // # Service name
  frameworkVersion: '3',
  useDotenv: true,
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      packager: 'yarn'
    },

    // # Name of environments
    stages: ['staging', 'production'],
    stage: "${opt:stage, 'staging'}",
    // # Name of environments
    prune: {
      automatic: true,
      number: 3,
    },

    // # Alert setup with topic and using alert for slack staging environment
    staging: {
      serverlessBoilerplateTopic: 'staging_ServerlessBoilerplateTopic',
      slackAlarmTopicWithArn:
        'arn:aws:sns:us-east-1:719533611419:favo-stg-topic-bot-tech',
    },
    // # Alert setup with topic and using alert for slack staging environment

    // # Alert setup with topic and using alert for slack production environment
    production: {
      serverlessBoilerplateTopic: 'production_ServerlessBoilerplateTopic',

      slackAlarmTopicWithArn:
        'arn:aws:sns:us-east-1:719533611419:favo-prd-topic-bot-tech',
    },
    // # Alert setup with topic and using alert for slack production environment

    // # SNS topic creation
    resources: {
      serverlessBoilerplateTopicArn: {
        'Fn::Join': [
          '',
          [
            'arn:aws:sns:',
            { Ref: 'AWS::Region' },
            ':',
            { Ref: 'AWS::AccountId' },
            ':${self:custom.${opt:stage, self:custom.stage}.serverlessBoilerplateTopic}',
          ],
        ],
      },
    },
    // # SNS topic creation

    // # SNS topic creation

    // # Default dash creation -- dashboards
    // # Creation of alarms for the level of error in the functions --alarms

    alerts: {
      dashboards: false,
      alarms: ['functionErrors'],
    },
  },

  // # Creation of alarms for the level of error in the functions --alarms
  // # Default dash creation -- dashboards

  // # Use of components for local testing
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-stage-manager',
    'serverless-prune-plugin',
    'serverless-plugin-aws-alerts',
    'serverless-iam-roles-per-function',
  ],
  // # Use of components for local testing

  // # Minimal version for node
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    // iamRoleStatements: [
    //   {
    //     Effect: 'Allow',
    //     Action: ['codedeploy:*'],
    //     Resource: '*',
    //   },
    // ],

    // # Minimal version for node

    // # MinimumCompressionSize - API Gateway allows for clients to receive compressed payloads, and supports various content encodings.
    // # ShouldStartNameWithService - You can use the shouldStartNameWithService option to change the naming scheme for HTTP API from the default ${stage}-${service} to ${service}-${stage}.
    // # Metrics - Use the following configuration to enable detailed CloudWatch Metrics:
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      metrics: true, // active to see CacheHits and Misses
    },

    // # MinimumCompressionSize - API Gateway allows for clients to receive compressed payloads, and supports various content encodings.
    // # ShouldStartNameWithService - You can use the shouldStartNameWithService option to change the naming scheme for HTTP API from the default ${stage}-${service} to ${service}-${stage}.
    // # Metrics - Use the following configuration to enable detailed CloudWatch Metrics:

    // # The existence of the logs property enables both access and execution logging. If you want to disable one or both of them, you can do so with the following -- accessLogging -- executionLogging
    // # The default API Gateway log level will be INFO. You can change this to error with the following - level: ERROR
    logs: {
      restApi: {
        accessLogging: false,
        executionLogging: false,
        level: 'INFO',
        fullExecutionData: false,
      },
    },

    // # The existence of the logs property enables both access and execution logging. If you want to disable one or both of them, you can do so with the following -- accessLogging -- executionLogging
    // # The default API Gateway log level will be INFO. You can change this to error with the following - level: ERROR

    // # Connection reuse parameter
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    // # Connection reuse parameter

    //  # Version of hashing algorithm used by Serverless Framework for function packaging

    lambdaHashingVersion: '20201221',
  },

  // # Serverless role configuration
  functions: { myFunction },
  // # Serverless role configuration

  resources: { Resources },
};

module.exports = serverlessConfiguration;
