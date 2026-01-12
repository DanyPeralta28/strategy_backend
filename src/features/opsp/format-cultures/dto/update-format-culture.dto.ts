import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatCultureDto } from './create-format-culture.dto';

export class UpdateFormatCultureDto extends OmitType(
  PartialType(CreateFormatCultureDto),
  ['id_company', 'id_entity'] as const,
) {}
