export default {
  // # Main queue creation and its deadLetter
  ServerlessBoilerplateQueue: {
    Type: "AWS::SQS::Queue",
    Properties: {
      QueueName: "${self:custom.stage}_ServerlessBoilerplateQueue",
      RedrivePolicy: {
        deadLetterTargetArn: {
          "Fn::GetAtt": ["DLServerlessBoilerplateQueue", "Arn"],
        },
        maxReceiveCount: 3,
      },
    },
  },
  DLServerlessBoilerplateQueue: {
    Type: "AWS::SQS::Queue",
    Properties: {
      QueueName: "${self:custom.stage}_ServerlessBoilerplateQueueDL",
    },
  },
  // # Main queue creation and its deadLetter
  // # Alarm configuration for queues
  DLServerlessBoilerplateQueueAlarm: {
    Type: "AWS::CloudWatch::Alarm",
    Properties: {
      AlarmDescription: "Alarm if queue contains more than 1 message",
      Namespace: "AWS/SQS",
      MetricName: "ApproximateNumberOfMessagesVisible",
      Dimensions: [
        {
          Name: "QueueName",
          Value: {
            "Fn::GetAtt": ["DLServerlessBoilerplateQueue", "QueueName"],
          },
        },
      ],
      Statistic: "Sum",
      Period: 60,
      EvaluationPeriods: 1,
      Threshold: 1,
      ComparisonOperator: "GreaterThanOrEqualToThreshold",
      AlarmActions: [
        {
          "Fn::Join": [
            "",
            [
              "arn:aws:sns:",
              { Ref: "AWS::Region" },
              ":",
              { Ref: "AWS::AccountId" },
              ":${self:custom.${self:custom.stage}.slackAlarmTopicWithArn}",
            ],
          ],
        },
        {
          "Fn::Join": [
            "",
            [
              "arn:aws:sns:",
              { Ref: "AWS::Region" },
              ":",
              { Ref: "AWS::AccountId" },
              ":${self:custom.${self:custom.stage}.slackAlarmTopicWithArn}",
            ],
          ],
        },
      ],
      OKActions: [
        {
          "Fn::Join": [
            "",
            [
              "arn:aws:sns:",
              { Ref: "AWS::Region" },
              ":",
              { Ref: "AWS::AccountId" },
              ":${self:custom.${self:custom.stage}.slackAlarmTopicWithArn}",
            ],
          ],
        },
        {
          "Fn::Join": [
            "",
            [
              "arn:aws:sns:",
              { Ref: "AWS::Region" },
              ":",
              { Ref: "AWS::AccountId" },
              ":${self:custom.${self:custom.stage}.slackAlarmTopicWithArn}",
            ],
          ],
        },
      ],
    },
  },
  // # Alarm configuration for queues
  // # Subscription to topic
  SnsPolicyServerlessBoilerplateQueue: {
    Type: "AWS::SQS::QueuePolicy",
    Properties: {
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "allow-sns-messages",
            Effect: "Allow",
            Principal: "*",
            Resource: { "Fn::GetAtt": ["ServerlessBoilerplateQueue", "Arn"] },
            Action: "SQS:SendMessage",
          },
        ],
      },
      Queues: [
        {
          Ref: "ServerlessBoilerplateQueue",
        },
      ],
    },
  },
  // # Subscription to topic
};
