import middy from "@middy/core";
import eventNormalizerMiddleware from "@middy/event-normalizer";
import { Context, SQSHandler } from "aws-lambda";

type HandlerType = SQSHandler;

export const middyfy = (handler: HandlerType): middy.MiddyfiedHandler<any, any, any, Context> => {
  return middy(handler).use(eventNormalizerMiddleware());
};
