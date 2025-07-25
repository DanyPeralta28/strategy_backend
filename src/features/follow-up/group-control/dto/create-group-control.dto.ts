import { ApiProperty } from '@nestjs/swagger';
import {IsString,IsOptional,IsDateString,IsInt,MaxLength,
} from 'class-validator';

export class CreateGroupControlDto {
  @ApiProperty({ example: 'Equipo A', description: 'Nombre del grupo verde' })
  @IsOptional()
  @IsString()
  game_green_group?: string;

  @ApiProperty({ example: 'Equipo B', description: 'Nombre del grupo limón' })
  @IsOptional()
  @IsString()
  game_lemon_group?: string;

  @ApiProperty({ example: 'Equipo C', description: 'Nombre del grupo amarillo' })
  @IsOptional()
  @IsString()
  game_yellow_group?: string;

  @ApiProperty({ example: 'Equipo D', description: 'Nombre del grupo rojo' })
  @IsOptional()
  @IsString()
  game_red_group?: string;

  @ApiProperty({ example: 'Ganador: Equipo A', description: 'Resultado del juego de grupos' })
  @IsOptional()
  @IsString()
  game_result_group?: string;

  @ApiProperty({ example: 'verde', description: 'Color final asignado al grupo (verde, amarillo, rojo, etc.)' })
  @IsOptional()
  @IsString()
  game_color_group?: string;

  @ApiProperty({ example: '2025-07-15T10:00:00Z', description: 'Fecha y hora del juego semanal' })
  @IsOptional()
  @IsDateString()
  date_time_weekly?: string;

  @ApiProperty({ example: 'BANRURAL_GT', description: 'Identificador de la compañía' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_company?: string;

  @ApiProperty({ example: 'SUCURSAL_001', description: 'Identificador de la sucursal o entidad' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({ example: 1, description: 'Estado del registro (1 = activo, 0 = eliminado)' })
  @IsInt()
  status: number;

  @ApiProperty({
    description: 'Usuario que creó el registro',
    example: { username: 'admin', role: 'coordinator' },
  })
  @IsOptional()
  created_by: any;
}
