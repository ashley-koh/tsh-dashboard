import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, RequestHandler, Response } from 'express';

import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction
) => {
  validate(
    plainToInstance(type, req[value]),
    { skipMissingProperties, whitelist, forbidNonWhitelisted }
  )
  .then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints))
        .join(', ');
      next(new HttpException(400, message));
    }
    else {
      next();
    }
  });
};

export default validationMiddleware;
