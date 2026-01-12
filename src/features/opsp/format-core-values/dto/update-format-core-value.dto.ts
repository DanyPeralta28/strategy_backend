import { PartialType } from '@nestjs/swagger';
import { CreateFormatCoreValuesDto } from './create-format-core-value.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateFormatCoreValuesDto extends OmitType(
  PartialType(CreateFormatCoreValuesDto),
  ['id_company', 'id_entity'] as const,
) {}
