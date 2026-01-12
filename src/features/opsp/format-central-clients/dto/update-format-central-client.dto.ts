import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatCentralClientDto } from './create-format-central-client.dto';

export class UpdateFormatCentralClientDto extends OmitType(
  PartialType(CreateFormatCentralClientDto),
  ['id_company', 'id_entity'] as const,
) {}
