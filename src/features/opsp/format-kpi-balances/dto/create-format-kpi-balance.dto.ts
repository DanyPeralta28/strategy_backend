import { IsString, MaxLength, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatKpiBalanceDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({
    description: 'Grouped KPI data by area',
    type: 'object',
    example: {
      employees: [
        { kpi: 'Engagement', result: '85%', color: 'light-green' },
        { kpi: 'Satisfaction', result: '90%', color: 'light-green' },
      ],
      customers: [
        { kpi: 'Loyalty', result: '80%', color: 'yellow' },
        { kpi: 'Referrals', result: '60%', color: 'red' },
      ],
      shareholders: [
        { kpi: 'Dividends', result: '50%', color: 'red' },
        { kpi: 'Growth', result: '70%', color: 'light-green' },
      ],
      training: [
        { kpi: 'Programs', result: '3', color: 'light-green' },
        { kpi: 'Hours', result: '120', color: 'dark-green' },
      ],
      sales: [
        { kpi: 'Campaigns', result: '5', color: 'yellow' },
        { kpi: 'Conversion Rate', result: '20%', color: 'red' },
      ],
      administration: [
        { kpi: 'Cost Efficiency', result: '92%', color: 'dark-green' },
        { kpi: 'Process Time', result: '15 min', color: 'light-green' },
      ],
    },
  })
  @IsObject()
  kpis: any;

  @ApiProperty({ example: '2025-07-31', description: 'KPI evaluation date' })
  @IsString()
  compliance_date: string;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
