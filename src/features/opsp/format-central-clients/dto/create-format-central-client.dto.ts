import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatCentralClientDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  id_company: string;

  @ApiProperty({ example: '25 años, mujer, educación universitaria' })
  @IsString()
  age_gender_education: string;

  @ApiProperty({ example: 'Vestimenta formal, cuidado personal notable' })
  @IsString()
  appearance_description: string;

  @ApiProperty({ example: 'Empieza el día revisando correos, luego visitas a clientes' })
  @IsString()
  typical_day_description: string;

  @ApiProperty({ example: 'Preocupación por estabilidad económica' })
  @IsString()
  fears_or_concerns: string;

  @ApiProperty({ example: 'Adquirir una casa propia' })
  @IsString()
  client_goals: string;

  @ApiProperty({ example: 'Falta de asesoría financiera' })
  @IsString()
  client_challenges: string;

  @ApiProperty({ example: 'Familia, bienestar, crecimiento profesional' })
  @IsString()
  life_priorities: string;

  @ApiProperty({ example: 'Bonificaciones, reconocimiento' })
  @IsString()
  motivations_or_rewards: string;

  @ApiProperty({ example: 'Se siente segura cuando logra metas' })
  @IsString()
  feelings_of_attractiveness: string;

  @ApiProperty({ example: 'Incertidumbre ante cambios laborales' })
  @IsString()
  feelings_of_discomfort: string;

  @ApiProperty({ example: 'Alcanzar metas personales y laborales' })
  @IsString()
  success_metrics: string;

  @ApiProperty({ example: 'Orientación clara sobre productos financieros' })
  @IsString()
  key_needs_from_us: string;

  @ApiProperty({ example: 'Ejecutiva de ventas, con enfoque en crecimiento personal' })
  @IsString()
  core_client_summary: string;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  created_by: string;
}
