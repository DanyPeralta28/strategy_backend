import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFollowUpStartWeeksDto } from './create-start-week.dto';

export class UpdateFollowUpStartWeeksDto extends OmitType(
  PartialType(CreateFollowUpStartWeeksDto),
  ['id_company', 'id_entity'] as const,
) {}
