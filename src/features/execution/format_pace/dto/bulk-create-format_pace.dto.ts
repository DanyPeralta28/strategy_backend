import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { CreateFormatPaceDto } from './create-format_pace.dto';

export class BulkCreateFormatPaceDto {
  @ApiProperty({
    type: [CreateFormatPaceDto],
    example: [
      {
        id_company: 'Scalingsoft',
        process_name: 'Invoice Processing',
        person_in_charge_name: 'John Doe',
        kpi_list: [{ kpi: 'Cycle Time (days)', target: 2 }],
        status: 1,
        created_by: '13474'
      },
      {
        id_company: 'Scalingsoft',
        process_name: 'Payment Approval',
        person_in_charge_name: 'Jane Smith',
        kpi_list: [{ kpi: 'Approval Time (hrs)', target: 24 }],
        status: 1,
        created_by: '13474'
      }
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateFormatPaceDto)
  items: CreateFormatPaceDto[];
}
