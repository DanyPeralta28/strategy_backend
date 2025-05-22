import { Metadata } from "./metadata.interface";
export interface NestInterceptorData {
  data: any;
  message: any;
  statusCode: number;
  metadata: Metadata;
}