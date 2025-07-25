// dto/update-player-a.dto.ts
import { PartialType, OmitType } from '@nestjs/swagger';
import { CreatePlayerADto } from './create-players-a.dto';

export class UpdatePlayerADto extends OmitType(
  PartialType(CreatePlayerADto),
  ['id_company'] as const,
) {}
