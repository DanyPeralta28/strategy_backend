import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatVisionDto } from './create-format-vision.dto';

export class UpdateFormatVisionDto extends OmitType(
  PartialType(CreateFormatVisionDto),
  ['id_company'] as const,
) {}
