import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, IsArray, ArrayNotEmpty } from 'class-validator';
import { IdeaSectionDto } from './idea-section.dto';

export class CreateCashFormatOptcashDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({
    type: IdeaSectionDto,
    isArray: true,
    example: [
      {
        letter: 'A',
        title: 'Optimizar embudo de ventas',
        items: ['Mejorar lead scoring', 'Automatizar follow-ups', 'Dashboard de conversión'],
        editing: false
      },
      {
        letter: 'B',
        title: 'Eficiencia en producción e inventario',
        items: ['Kanban en planta', 'Reorden automático de insumos', 'Clasificación ABC'],
        editing: false
      },
      {
        letter: 'C',
        title: 'Entrega y distribución',
        items: ['Ruteo con ventanas de tiempo', 'Trackeo en tiempo real', 'Acuerdos con 3PL'],
        editing: false
      },
      {
        letter: 'D',
        title: 'Facturación y cobro',
        items: ['Recordatorios automáticos', 'Descuentos por pronto pago', 'Conciliación con gateway'],
        editing: false
      }
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  ideas: IdeaSectionDto[];

  @ApiProperty({ example: 1 })
  @IsInt()
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
