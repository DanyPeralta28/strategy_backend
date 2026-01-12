import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatGoalDto } from './create-format-goal.dto';

export class UpdateFormatGoalDto extends OmitType(
  PartialType(CreateFormatGoalDto),
  ['id_company', 'id_entity'] as const,
) {}
