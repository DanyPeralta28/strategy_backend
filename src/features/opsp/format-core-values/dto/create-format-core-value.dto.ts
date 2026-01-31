import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatCoreValuesDto {
  @ApiProperty({ example: 'Integridad' })
  @IsString()
  @MaxLength(150)
  value_title: string;

  @ApiProperty({ example: 'Actuamos con ética y transparencia' })
  @IsString()
  @MaxLength(500)
  short_description: string;

  @ApiProperty({
    example: 'Nuestra empresa fomenta la honestidad como pilar de la confianza con nuestros clientes.',
  })
  @IsString()
  @MaxLength(2000)
  long_description: string;

  @ApiProperty({ example: '13474' })
  @IsString()
  @MaxLength(100)
  created_by: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @MaxLength(50)
  id_entity: string;
}
