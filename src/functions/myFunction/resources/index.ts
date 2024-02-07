import SQSResources from "./sqs";
import SNSResources from "./sns";
import KinesisResources from "./kinesis";

export default {
  ...SQSResources,
  ...SNSResources,
  ...KinesisResources,
};
