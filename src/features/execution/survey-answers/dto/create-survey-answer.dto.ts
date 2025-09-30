import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsNotEmpty, IsArray, IsNumber, Min } from 'class-validator';

export class CreateExecutionSurveyAnswerDto {
  @ApiProperty({ example: 'Scalling', description: 'Company identifier (maps to id_company)' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'SUCURSAL_001', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({ example: '1', description: 'Campaign identifier (maps to id_campaign)' })
  @IsNumber()
  @Min(1)
  id_campaign: number;

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_1?: any[];

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_2?: any[];

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_3?: any[];

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_4?: any[];

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_5?: any[];

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_6?: any[];

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_7?: any[];

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_8?: any[];

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_9?: any[];

  @ApiProperty({
    required: false,
    type: 'array',
    example: [{ value_1: 10, value_2: 10, value_3: 10, value_4: 10 }],
  })
  @IsOptional()
  @IsArray()
  segment_10?: any[];
}
