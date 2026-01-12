// dto/update-consistent-action.dto.ts
import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateConsistentActionDto } from './create-consistent-action.dto';

export class UpdateConsistentActionDto extends OmitType(
  PartialType(CreateConsistentActionDto),
  ['id_company', 'id_entity'] as const,
) {}
