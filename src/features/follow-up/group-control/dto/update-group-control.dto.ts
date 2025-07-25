import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateGroupControlDto } from './create-group-control.dto';

export class UpdateGroupControlDto extends OmitType(
  PartialType(CreateGroupControlDto),
  ['id_company', 'id_entity'] as const,
) {}
