import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatFdtDto } from './create-format-fdt.dto';

export class UpdateFormatFdtDto extends OmitType(
  PartialType(CreateFormatFdtDto),
  ['id_company', 'id_entity'] as const,
) {}
