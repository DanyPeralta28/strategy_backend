import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatBhagDto } from './create-format-bhag.dto';

export class UpdateFormatBhagDto extends OmitType(
  PartialType(CreateFormatBhagDto),
  ['id_company', 'id_entity'] as const,
) {}
