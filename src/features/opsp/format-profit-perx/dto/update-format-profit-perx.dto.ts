import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatProfitPerXDto } from './create-format-profit-perx.dto';

export class UpdateFormatProfitPerXDto extends OmitType(
  PartialType(CreateFormatProfitPerXDto),
  ['id_company'] as const,
) {}
