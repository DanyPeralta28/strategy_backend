import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatStrataDto } from './create-format-strata.dto';

export class UpdateFormatStrataDto extends OmitType(
  PartialType(CreateFormatStrataDto),
  ['id_company'] as const,
) {}
