import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateExecutionSurveyCampaignDto {
  @ApiProperty({ example: 'Scalling', description: 'Company identifier (id_company)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'admin@scalling.com', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  created_by?: string;
}
