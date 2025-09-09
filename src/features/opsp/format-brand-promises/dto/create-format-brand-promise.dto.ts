import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatBrandPromiseDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  id_company: string;

  @ApiProperty({ example: 'Rapidez garantizada' })
  @IsString()
  primary_promise: string;

  @ApiProperty({ example: 'Transparencia en el servicio' })
  @IsString()
  secondary_promise: string;

  @ApiProperty({ example: 'Atención personalizada' })
  @IsString()
  tertiary_promise: string;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  created_by: string;
}
