import { IsString, MaxLength, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatCompetencyDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Customer Service' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  core_competency?: string;

  @ApiProperty({ example: 'Ability to serve internal and external clients' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  competency_description?: string;

  @ApiProperty({
    description: 'Listado de competencias clave',
    type: 'array',
    example: [
      { name: 'Empatía', description: 'Capacidad de ponerse en el lugar del otro' },
      { name: 'Escucha activa', description: 'Atención plena al interlocutor' },
    ],
  })
  @IsOptional()
  @IsArray()
  competencies_list?: any[];

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
