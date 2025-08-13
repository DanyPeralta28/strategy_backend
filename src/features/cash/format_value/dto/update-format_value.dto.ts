import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateCashFormatValueDto } from './create-format_value.dto';

export class UpdateCashFormatValueDto extends OmitType(
  PartialType(CreateCashFormatValueDto),
  ['id_company'] as const,
) {}
