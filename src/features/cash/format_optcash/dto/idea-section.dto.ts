import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, IsArray, IsOptional, MaxLength } from 'class-validator';

export class IdeaSectionDto {
  @ApiProperty({ enum: ['A', 'B', 'C', 'D'], example: 'A' })
  @IsIn(['A', 'B', 'C', 'D'])
  letter: 'A' | 'B' | 'C' | 'D';

  @ApiProperty({ example: 'Ideas para mejorar el ciclo de Ventas' })
  @IsString()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'Contenido libre de la sección (lista, objetos, etc.)',
    type: 'array',
    example: [{ idea: 'Implementar CRM', benefit: 'Mayor conversión' }],
  })
  @IsArray()
  items: any[];

  @ApiProperty({ required: false, example: false })
  @IsOptional()
  editing?: boolean;
}
