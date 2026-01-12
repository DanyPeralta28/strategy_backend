import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatTerritoryDto } from './create-format-territory.dto';

export class UpdateFormatTerritoryDto extends OmitType(
  PartialType(CreateFormatTerritoryDto),
  ['id_company', 'id_entity'] as const,
) {}
