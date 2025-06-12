import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatFlywheelDto } from './create-format-flywheel.dto';

export class UpdateFormatFlywheelDto extends OmitType(
  PartialType(CreateFormatFlywheelDto),
  ['id_company'] as const,
) {}
