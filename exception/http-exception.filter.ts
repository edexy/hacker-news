import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

import logger from 'utils/logger';
import { errorResponse, errorResponseSpec } from 'utils/response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status !== 500) {
      const appResponse = exception.getResponse() as errorResponseSpec;

      response.status(exception.getStatus()).json(errorResponse(appResponse));
    } else {
      logger.error(
        `${exception.message}\n stackTrace: ${exception.stack} \n endpoint: ${request.url}`,
      );

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        error: 'Something went wrong',
      });
    }
  }
}
