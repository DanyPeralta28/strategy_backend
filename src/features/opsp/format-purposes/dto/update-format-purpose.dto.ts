import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatPurposeDto } from './create-format-purpose.dto';

export class UpdateFormatPurposeDto extends OmitType(
  PartialType(CreateFormatPurposeDto),
  ['id_company'] as const,
) {}
