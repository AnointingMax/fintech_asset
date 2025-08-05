import * as Yup from "yup"
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

type ReqParameter = "query" | "params" | "body"
type ResourceSchema = Yup.Schema | ((request: Request) => Yup.Schema);

const validateRequestParameters = (resourceSchema: ResourceSchema, reqParameter: ReqParameter) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const resource = req[reqParameter];

    const schema = typeof resourceSchema === "function" ? resourceSchema(req) : resourceSchema;

    const parsedResource = await schema.validate(resource, {
      stripUnknown: true,
    });

    req[reqParameter] = parsedResource;

    next();
  });

export default validateRequestParameters