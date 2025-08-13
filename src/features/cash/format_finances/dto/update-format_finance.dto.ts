import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateCashFormatFinancesDto } from './create-format_finance.dto';

export class UpdateCashFormatFinancesDto extends OmitType(
  PartialType(CreateCashFormatFinancesDto),
  ['id_company'] as const,
) {}
