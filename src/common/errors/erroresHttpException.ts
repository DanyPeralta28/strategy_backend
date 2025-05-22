import { HttpException } from "@nestjs/common";

export class CustomForbiddenException extends HttpException {
    constructor(data: any = null, message: string, httpStatus: number) {
      super({ data, message }, httpStatus);  //HttpStatus.NOT_FOUND
    }
  }