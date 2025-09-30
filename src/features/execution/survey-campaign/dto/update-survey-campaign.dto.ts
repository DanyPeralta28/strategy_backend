import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNotEmpty, isNumber, IsNumber, isNotEmpty } from 'class-validator';

export class UpdateExecutionSurveyCampaignDto {

  @ApiProperty({ example: 2, required: true })
  @IsNotEmpty()
  @IsNumber()
  status?: number;
}
