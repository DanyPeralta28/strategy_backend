import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.formatDates(data);
      }),
    );
  }

  private formatDates(data: any): any {
    if (data instanceof Date) {
      return this.formatDate(data);
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.formatDates(item));
    }

    if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = this.formatDates(data[key]);
        }
      }
    }

    return data;
  }

  private formatDate = (date: Date): string => {
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const year: string = String(date.getFullYear());
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const seconds: string = String(date.getSeconds()).padStart(2, '0');
    const formattedDate: string = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  };
}
