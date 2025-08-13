import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateCashFormatOptcashDto } from './create-format_optcash.dto';

export class UpdateCashFormatOptcashDto extends OmitType(
  PartialType(CreateCashFormatOptcashDto),
  ['id_company'] as const,
) {}
