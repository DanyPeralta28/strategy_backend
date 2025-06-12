import { IsString, MaxLength, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatKpiBalanceDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: { engagement: 85, satisfaction: 90 } })
  @IsObject()
  employee_balance: object;

  @ApiProperty({ example: { loyalty: 80, referrals: 60 } })
  @IsOptional()
  @IsObject()
  customer_balance?: object;

  @ApiProperty({ example: { dividends: 50, growth: 70 } })
  @IsOptional()
  @IsObject()
  shareholder_balance?: object;

  @ApiProperty({ example: { programs: 3, hours: 120 } })
  @IsOptional()
  @IsObject()
  training_balance?: object;

  @ApiProperty({ example: { campaigns: 5, conversion: 20 } })
  @IsOptional()
  @IsObject()
  sales_marketing_balance?: object;

  @ApiProperty({ example: { cost_efficiency: 92 } })
  @IsOptional()
  @IsObject()
  administration_balance?: object;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
