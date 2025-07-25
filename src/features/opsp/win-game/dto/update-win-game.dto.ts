import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateWinGameDto } from './create-win-game.dto';

export class UpdateWinGameDto extends OmitType(
  PartialType(CreateWinGameDto),
  ['id_company'] as const,
) {}
