import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, NotFoundException } from "@nestjs/common";
import { Response } from "express";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response.status(HttpStatus.NOT_FOUND).sendFile('../../../public/404.html', { root: '.' });
    }
}