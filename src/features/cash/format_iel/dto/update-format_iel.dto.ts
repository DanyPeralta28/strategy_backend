import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateCashFormatIelDto } from './create-format_iel.dto';

export class UpdateCashFormatIelDto extends OmitType(
  PartialType(CreateCashFormatIelDto),
  ['id_company'] as const,
) {}
