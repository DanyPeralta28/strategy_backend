import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class CreateFormatGoalDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id_company: string;
  
  @ApiProperty({ example: '1', required: false })
  @IsString()
  id_entity?: string;

  @ApiProperty({ example: '13474' })
  @IsString()
  created_by: string;

  @ApiProperty({
    description: 'List of goal sections by period',
    type: 'array',
    required: false,
    example: [
      {
        key: 'threeFiveYears',
        values: [
          { titulo: 'Año tributario', value: '2025' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
        ],
      },
      {
        key: 'year',
        values: [
          { titulo: 'Año tributario', value: '2025' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
        ],
      },
      {
        key: 'trimesterOne',
        values: [
          { titulo: 'Año tributario', value: '2025' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
        ],
      },
      {
        key: 'trimesterTwo',
        values: [
          { titulo: 'Año tributario', value: '2025' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
        ],
      },
      {
        key: 'trimesterThree',
        values: [
          { titulo: 'Año tributario', value: '2025' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
        ],
      },
      {
        key: 'trimesterFour',
        values: [
          { titulo: 'Año tributario', value: '2025' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
          { titulo: '', value: '' },
        ],
      },
    ],
  })
  @IsArray()
  @IsOptional()
  goal_sections?: any[];
}
