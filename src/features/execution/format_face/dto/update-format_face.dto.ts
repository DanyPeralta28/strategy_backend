import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatFaceDto } from './create-format_face.dto';

export class UpdateFormatFaceDto extends OmitType(
  PartialType(CreateFormatFaceDto),
  ['id_company', 'id_entity'] as const,
) {}
