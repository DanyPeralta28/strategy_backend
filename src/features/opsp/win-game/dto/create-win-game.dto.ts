import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
  IsInt,
} from 'class-validator';

export class CreateWinGameDto {
  @ApiProperty({ example: '1', description: 'Company identifier' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: '1', description: 'Entity identifier', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;
  
  @ApiProperty({
    example: '2025-12-31',
    description: 'Deadline for achieving the game objective',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiProperty({
    example: 'Equipo de Marketing',
    description: 'Team involved in the game',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  team?: string;

  @ApiProperty({
    example: 'Reglas claras y medibles',
    description: 'Game rules',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_rules?: string;

  @ApiProperty({
    example: 'Tablero mensual en oficina principal',
    description: 'Scoreboard description',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  scoreboard?: string;

  @ApiProperty({
    example: 'Fiesta al lograr la meta',
    description: 'Plan de celebración al ganar el juego',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  celebration_plan?: string;

  @ApiProperty({
    example: 'Bonificación trimestral',
    description: 'Recompensa por lograr el objetivo',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  reward?: string;

  @ApiProperty({ example: 1, description: 'Status of the record' })
  @IsInt()
  status: number;

  @ApiProperty({
    example: '13474',
    description: 'User that created the record',
  })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
