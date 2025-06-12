import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatBrandPromiseDto } from './create-format-brand-promise.dto';

export class UpdateFormatBrandPromiseDto extends OmitType(
  PartialType(CreateFormatBrandPromiseDto),
  ['id_company'] as const,
) {}
