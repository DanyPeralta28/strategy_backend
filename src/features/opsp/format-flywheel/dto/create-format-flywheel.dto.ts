import { IsString, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatFlywheelDto {
  @ApiProperty({ example: 101 })
  @IsNumber()
  code: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  order_item: number;

  @ApiProperty({
    example: 'Generar demanda sostenible',
    maxLength: 500,
  })
  @IsString()
  @MaxLength(500)
  title: string;

  @ApiProperty({
    example: 'Incrementar leads calificados',
    maxLength: 250,
  })
  @IsString()
  @MaxLength(250)
  kpi_description: string;

  @ApiProperty({
    example: 'Luis Méndez',
    maxLength: 150,
  })
  @IsString()
  @MaxLength(150)
  kpi_leader: string;

  @ApiProperty({
    example: 'admin_user',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  created_by: string;

  @ApiProperty({
    example: 'Scalingsoft',
    maxLength: 50,
  })
  @IsString()
  @MaxLength(50)
  id_company: string;
}
