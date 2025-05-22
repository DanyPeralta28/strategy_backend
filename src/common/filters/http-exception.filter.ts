import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { NestInterceptorData } from '../interfaces/nestInterceptorData.interface';
import { parseResultTime } from '../../utils/date-parser';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  private readonly logger = new Logger('HttpExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const now = host.switchToHttp().getRequest().timerStart;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.name;
    const excepres = exception.getResponse();
    //const message = excepres['message'];
    const data = excepres['data'];
    const exceptionResponse = exception.getResponse();
    const message = excepres['message'];
    
    const correlationId = request['correlationId'] || randomUUID();
    const resBody: NestInterceptorData = {
      data: data,
      message: message,
      statusCode: status,
      metadata: {
        traceId: "", startDate: now,
        endDate: new Date(Date.now()),
        resultTime: parseResultTime(Date.now() - now),
        resultTimeMilliseconds: now - Date.now()
      },
    }

    this.logger.error(`CorrelationID: [${correlationId}] Method: [${request.method}] Path: [${request.url}] MessageError: [${message}] Request Body: [${JSON.stringify(request.body)}] Response Body: [${JSON.stringify(resBody)}]`);
    this.logger.error(`CorrelationID: [${correlationId}] Exception: [${JSON.stringify({ exception })}]`);

    response
      .status(status)
      .json(resBody);
  }

  toArray(data: string | Array<any>): Array<any> {
    if (typeof data === "string") {
      return data.split(",");
    } else {
      return data;
    }
  }

}