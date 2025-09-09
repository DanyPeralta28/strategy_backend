import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { CreateFormatFaceDto } from './create-format_face.dto';

export class BulkCreateFormatFaceDto {
  @ApiProperty({
    type: [CreateFormatFaceDto],
    example: [
      {
        id_company: 'Scalingsoft',
        function_name: 'Reconciliation',
        accountable_name: 'John Doe',
        kpi_list: [{ kpi: 'On-time Delivery', target: 95 }],
        results_list: [{ month: '2025-08', result: 96 }],
        status: 1,
        created_by: '13474'
      },
      {
        id_company: 'Scalingsoft',
        function_name: 'Collections',
        accountable_name: 'Jane Smith',
        kpi_list: [{ kpi: 'Collection Rate', target: 90 }],
        results_list: [{ month: '2025-09', result: 91 }],
        status: 1,
        created_by: '13474'
      }
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateFormatFaceDto)
  items: CreateFormatFaceDto[];
}
