export default {
  // # Subscription to topic
  SNSSubscriptionServerlessBoilerplateQueue: {
    Type: "AWS::SNS::Subscription",
    Properties: {
      TopicArn: {
        Ref: "SNSServerlessBoilerplate",
      },
      Endpoint: {
        "Fn::GetAtt": ["ServerlessBoilerplateQueue", "Arn"],
      },
      Protocol: "sqs",
      FilterPolicy: {
        event: [
          "ServiceAssignedEvent",
          "ServiceAcceptedEvent",
          "ServiceStartedEvent",
          "ServiceArrivedEvent",
          "ServiceDoneEvent",
          "ServiceCanceledEvent",
          "RouteStartedEvent",
          "RouteExecutionEvent",
        ],
        type: ["ServerlessBoilerplate"],
        source: ["TemplateService"],
      },
      RawMessageDelivery: "true",
    },
  },
  SNSServerlessBoilerplate: {
    Type: "AWS::SNS::Topic",
    Properties: {
      DisplayName: "${self:custom.stage}_ServerlessBoilerplate",
      TopicName: "${self:custom.stage}_ServerlessBoilerplate",
    },
  },
  // # Subscription to topic
};
