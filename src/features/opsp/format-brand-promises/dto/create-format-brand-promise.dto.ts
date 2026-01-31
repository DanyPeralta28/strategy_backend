import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatBrandPromiseDto {
  @ApiProperty({ example: '1' })
  @IsString()
  id_company: string;

  @ApiProperty({ example: 'SUCURSAL_001' })
  @IsString()
  id_entity?: string;

  @ApiProperty({ example: 'Rapidez garantizada' })
  @IsString()
  primary_promise: string;

  @ApiProperty({ example: 'Transparencia en el servicio' })
  @IsString()
  secondary_promise: string;

  @ApiProperty({ example: 'Atención personalizada' })
  @IsString()
  tertiary_promise: string;

  @ApiProperty({ example: '13474' })
  @IsString()
  created_by: string;
}
