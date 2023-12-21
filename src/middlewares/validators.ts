import { NextFunction, Request, Response } from 'express';

import { ZodSchema } from 'zod';

export function validateQueryParamSchemas(schema: ZodSchema) {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      res.status(400);
      return res.json({
        error: 'Invalid Query Params',
      });
    }
    req.query = result.data;
    next();
  };
}

export function validatePathParamSchemas(schema: ZodSchema) {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      res.status(400);
      return res.json({
        error: 'Invalid Path Params',
      });
    }
    req.params = result.data;

    next();
  };
}

export function validateBodySchema(schema: ZodSchema) {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400);
      return res.json({
        error: 'Invalid body',
      });
    }
    req.body = result.data;

    next();
  };
}
