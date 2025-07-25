import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFollowUpPriorityWeeksDto } from './create-priority-week.dto';

export class UpdateFollowUpPriorityWeeksDto extends OmitType(
  PartialType(CreateFollowUpPriorityWeeksDto),
  ['id_company', 'id_entity'] as const,
) {}
