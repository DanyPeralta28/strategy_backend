import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatPaceDto } from './create-format_pace.dto';

export class UpdateFormatPaceDto extends OmitType(
  PartialType(CreateFormatPaceDto),
  ['id_company'] as const,
) {}
