import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateExecutionSurveyCampaignDto {

  @ApiProperty({ example: 'GRUPO DE LAS 10 AM', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  campaign_name?: string;

  
  @ApiProperty({ example: 'Scalling', description: 'Company identifier (id_company)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'SUCURSAL_001', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({ example: '1', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  created_by?: string;
}
