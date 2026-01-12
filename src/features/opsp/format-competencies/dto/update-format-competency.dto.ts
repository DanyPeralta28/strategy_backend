import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatCompetencyDto } from './create-format-competency.dto';

export class UpdateFormatCompetencyDto extends OmitType(
  PartialType(CreateFormatCompetencyDto),
  ['id_company', 'id_entity'] as const,
) {}
