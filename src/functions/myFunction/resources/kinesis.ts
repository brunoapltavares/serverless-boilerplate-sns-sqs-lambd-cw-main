export default {
  ServerlessBoilerplateBucket: {
    Type: "AWS::S3::Bucket",
  },
  ServerlessBoilerplateStreamRole: {
    Type: "AWS::IAM::Role",
    Properties: {
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Sid: "",
            Effect: "Allow",
            Principal: {
              Service: "firehose.amazonaws.com",
            },
            Action: "sts:AssumeRole",
          },
        ],
      },
    },
  },
  ServerlessBoilerplateStream: {
    Type: "AWS::KinesisFirehose::DeliveryStream",
    Properties: {
      S3DestinationConfiguration: {
        BucketARN: {
          "Fn::Sub": "arn:${AWS::Partition}:s3:::${ServerlessBoilerplateBucket}",
        },
        BufferingHints: {
          IntervalInSeconds: 60,
          SizeInMBs: 1,
        },
        CompressionFormat: "UNCOMPRESSED",
        RoleARN: { "Fn::GetAtt": ["ServerlessBoilerplateStreamRole", "Arn"] },
      },
    },
  },
  ServerlessBoilerplateStreamRolePolicy: {
    Type: "AWS::IAM::Policy",
    Properties: {
      PolicyName: "FirehoseticketUploadStreamRolePolicy",
      PolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: [
              "s3:AbortMultipartUpload",
              "s3:GetBucketLocation",
              "s3:GetObject",
              "s3:ListBucket",
              "s3:ListBucketMultipartUploads",
              "s3:PutObject",
            ],
            Resource: [
              {
                "Fn::Sub": "arn:aws:s3:::${ServerlessBoilerplateBucket}",
              },
              {
                "Fn::Sub": "arn:aws:s3:::${ServerlessBoilerplateBucket}/*",
              },
            ],
          },
        ],
      },
      Roles: [{ Ref: "ServerlessBoilerplateStreamRole" }],
    },
  },
  ServerlessBoilerplateStreamSubscriptionRole: {
    Type: "AWS::IAM::Role",
    Properties: {
      AssumeRolePolicyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              Service: ["sns.amazonaws.com"],
            },
            Action: ["sts:AssumeRole"],
          },
        ],
      },
      Policies: [
        {
          PolicyName: "SNSKinesisFirehoseAccessPolicy",
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Resource: {
                  "Fn::GetAtt": ["ServerlessBoilerplateStream", "Arn"],
                },
                Action: [
                  "firehose:DescribeDeliveryStream",
                  "firehose:ListDeliveryStreams",
                  "firehose:ListTagsForDeliveryStream",
                  "firehose:PutRecord",
                  "firehose:PutRecordBatch",
                ],
              },
            ],
          },
        },
      ],
    },
  },
  ServerlessBoilerplateStreamSubscription: {
    Type: "AWS::SNS::Subscription",
    Properties: {
      TopicArn: {
        Ref: "SNSServerlessBoilerplate",
      },
      Endpoint: {
        "Fn::GetAtt": ["ServerlessBoilerplateStream", "Arn"],
      },
      Protocol: "firehose",
      SubscriptionRoleArn: {
        "Fn::GetAtt": ["ServerlessBoilerplateStreamSubscriptionRole", "Arn"],
      },
    },
  },
};
