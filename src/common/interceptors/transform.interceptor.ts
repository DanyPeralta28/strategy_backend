import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestInterceptorData } from '../interfaces/nestInterceptorData.interface';
import { randomUUID } from 'crypto';
import { parseResultTime } from '../../utils/date-parser';

@Injectable()
export class CustomInterceptor implements NestInterceptor {

  private readonly logger = new Logger('CustomInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<NestInterceptorData> {
    const startDate = Date.now();
    context.switchToHttp().getRequest().timerStart = startDate;
    const request = context.switchToHttp().getRequest();
    const correlationId = request.headers['correlation-id'] || randomUUID();
    context.switchToHttp().getRequest().correlationId = correlationId;

    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode
    let message = 'OK'
    if (statusCode == 200) {
      message = 'Operación exitosa'
    } else if (statusCode == 404) {
      message = 'Not Found'
    } else if (statusCode == 400) {
      message = 'Bad Request'
    }


    return next.handle().pipe(
      map((result) => {
        const time = Date.now() - startDate;
        this.logger.log(`CorrelationID: [${correlationId}] Method: [${request.method}] Path: [${request.url}] MessageError: [${message}] Request Body: [${JSON.stringify(request.body)}] Response statusCode: [${statusCode}] Time: [${time}]`);
        const respuesta: NestInterceptorData = {
          data: result['data'], /* result */
          message: result['message'],
          statusCode,
          metadata: {
            traceId: "",
            startDate: new Date(startDate),
            endDate: new Date(Date.now()),
            resultTime: parseResultTime(Date.now() - startDate),
            resultTimeMilliseconds: Date.now() - startDate
          },
        };
        return respuesta;
      }),
    );

  }

}