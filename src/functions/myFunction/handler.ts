import "source-map-support/register";
import { middyfy } from "@libs/lambda";
import Logger from "@dazn/lambda-powertools-logger";
import { SQSEvent, SQSHandler } from "aws-lambda/trigger/sqs";
import { LOGS } from "@constants";

const eventHandler: SQSHandler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      Logger.debug(LOGS.ServerlessBoilerplate, record);

      const eventName = record.messageAttributes.event.stringValue;

      Logger.debug(LOGS.ServerlessBoilerplate, {
        eventName,
      });
    } catch (err) {
      Logger.error(LOGS.ServerlessBoilerplate, err);
      if (err.cancellationReasons) {
        Logger.error(LOGS.ServerlessBoilerplate, err.cancellationReasons);
      }
    }
  }
};

export const main = middyfy(eventHandler);
