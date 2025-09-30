import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { CreateFormatWwwDto } from './create-format_www.dto';

export class BulkCreateFormatWwwDto {
  @ApiProperty({
    type: [CreateFormatWwwDto],
    example: [
      {
        id_company: 'Scalingsoft',
        id_entity: 'SUCURSAL_001',
        what: 'Entregar el plan de marketing',
        who: 'Julio An leu',
        when: '2025-01-28',
        www_status: 'Atrasado',
        new_when: '2025-03-30',
        status: 1,
        created_by: '13474',
      },
      {
        id_company: 'Scalingsoft',
        id_entity: 'SUCURSAL_001',
        what: 'Enviar reporte mensual',
        who: 'Ana Gómez',
        when: '2025-02-05',
        www_status: 'Pendiente',
        new_when: '2025-02-10',
        status: 1,
        created_by: '13474',
      },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateFormatWwwDto)
  items: CreateFormatWwwDto[];
}
