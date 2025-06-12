import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateFormatKpiBalanceDto } from './create-format-kpi-balance.dto';

export class UpdateFormatKpiBalanceDto extends OmitType(
  PartialType(CreateFormatKpiBalanceDto),
  ['id_company'] as const,
) {}
