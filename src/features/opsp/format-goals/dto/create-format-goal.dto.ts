import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatGoalDto {
  @ApiProperty({ example: '2025' })
  @IsString()
  fiscal_year: string;

  @ApiProperty({ example: 'Q1' })
  @IsString()
  quarter: string;

  @ApiProperty({ example: 'A' })
  @IsString()
  type: string;

  @ApiProperty({ example: 1000000.00 })
  @IsNumber()
  revenue: number;

  @ApiProperty({ example: 150000.00 })
  @IsNumber()
  profit: number;

  @ApiProperty({ example: 45.25 })
  @IsNumber()
  gross_margin: number;

  @ApiProperty({ example: 200000.00 })
  @IsNumber()
  cash: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  days_receivable: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  inventory_turnover_days: number;

  @ApiProperty({ example: 75000.00 })
  @IsNumber()
  revenue_per_employee: number;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  created_by: string;

  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  id_company: string;
}
