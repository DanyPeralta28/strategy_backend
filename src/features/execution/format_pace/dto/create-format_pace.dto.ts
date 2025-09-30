import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateFormatPaceDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'SUCURSAL_001', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;


  @ApiProperty({ example: 'Invoice Processing' })
  @IsString()
  @MaxLength(100)
  process_name: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MaxLength(250)
  person_in_charge_name: string;

  @ApiProperty({ type: 'array', example: [{ kpi: 'Cycle Time (days)', target: 2 }] })
  @IsArray()
  @ArrayNotEmpty()
  kpi_list: any[];

  @ApiProperty({ example: 1 })
  @IsInt()
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
