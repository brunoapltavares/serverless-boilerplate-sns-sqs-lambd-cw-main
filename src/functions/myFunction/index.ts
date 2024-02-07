import { handlerPath } from "../../libs/handlerResolver";

export default {
  // # Handler (Lambda) path to implementation
  handler: `${handlerPath(__dirname)}/handler.main`,
  // # Handler (Lambda) path to implementation

  // # Trigger (SQS) responsible for initializing the Lambda
  events: [
    {
      sqs: {
        batchSize: 10,
        arn: {
          "Fn::GetAtt": ["ServerlessBoilerplateQueue", "Arn"],
        },
      },
    },
  ],
  // # Trigger (SQS) responsible for initializing the Lambda

  // # Permission for event publishing
  iamRoleStatements: [
    {
      Action: ["SNS:publish"],
      Resource: [{ Ref: "SNSServerlessBoilerplate" }],
      Effect: "Allow",
    },
  ],
  // # Permission for event publishing
};
