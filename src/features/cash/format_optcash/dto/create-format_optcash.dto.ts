import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, IsArray, ArrayNotEmpty } from 'class-validator';
import { IdeaSectionDto } from './idea-section.dto';

export class CreateCashFormatOptcashDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({
    type: IdeaSectionDto,
    isArray: true,
    example: [
      { letter: 'A', title: 'Ideas para mejorar el ciclo de Ventas', items: [], editing: false },
      { letter: 'B', title: 'Ideas para Manufactura/Producción e Inventario', items: [], editing: false },
      { letter: 'C', title: 'Ideas para Entrega/Distribución', items: [], editing: false },
      { letter: 'D', title: 'Ideas para Facturación y Cobro', items: [], editing: false },
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
