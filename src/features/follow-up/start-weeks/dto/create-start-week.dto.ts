import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsInt, MaxLength } from 'class-validator';

export class CreateFollowUpStartWeeksDto {
  @ApiProperty({ example: '2025-07-01', description: 'Start date of the week' })
  @IsOptional()
  @IsDateString()
  date_start?: string;

  @ApiProperty({ example: 1, description: 'View list type (1 = KPI, 2 = Priority)' })
  @IsOptional()
  @IsInt()
  id_view_list?: number;

  @ApiProperty({ example: 'Scalingsoft', description: 'Company identifier' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_company?: string;

  @ApiProperty({ example: 'SUCURSAL_001', description: 'Entity identifier' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({ example: 1, description: 'Status of the record' })
  @IsInt()
  status: number;

  @ApiProperty({
    description: 'User that created the record',
    example: { username: 'admin', role: 'coordinator' },
  })
  @IsOptional()
  created_by: any;
}
