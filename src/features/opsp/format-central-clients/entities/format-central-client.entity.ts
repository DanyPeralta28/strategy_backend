import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_central_clients')
export class FormatCentralClient {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'central_client_id' })
  id: number;

  @ApiProperty({ example: 'BANRURAL_GT' })
  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({ example: '25 años, mujer, educación universitaria' })
  @Column({ length: 500, nullable: true })
  age_gender_education: string;

  @ApiProperty({ example: 'Vestimenta formal, cuidado personal notable' })
  @Column({ length: 500, nullable: true })
  appearance_description: string;

  @ApiProperty({ example: 'Empieza el día revisando correos, luego visitas a clientes' })
  @Column({ length: 1000, nullable: true })
  typical_day_description: string;

  @ApiProperty({ example: 'Preocupación por estabilidad económica' })
  @Column({ length: 1000, nullable: true })
  fears_or_concerns: string;

  @ApiProperty({ example: 'Adquirir una casa propia' })
  @Column({ length: 1000, nullable: true })
  client_goals: string;

  @ApiProperty({ example: 'Falta de asesoría financiera' })
  @Column({ length: 1000, nullable: true })
  client_challenges: string;

  @ApiProperty({ example: 'Familia, bienestar, crecimiento profesional' })
  @Column({ length: 1000, nullable: true })
  life_priorities: string;

  @ApiProperty({ example: 'Bonificaciones, reconocimiento' })
  @Column({ length: 1000, nullable: true })
  motivations_or_rewards: string;

  @ApiProperty({ example: 'Se siente segura cuando logra metas' })
  @Column({ length: 500, nullable: true })
  feelings_of_attractiveness: string;

  @ApiProperty({ example: 'Incertidumbre ante cambios laborales' })
  @Column({ length: 1000, nullable: true })
  feelings_of_discomfort: string;

  @ApiProperty({ example: 'Alcanzar metas personales y laborales' })
  @Column({ length: 1000, nullable: true })
  success_metrics: string;

  @ApiProperty({ example: 'Orientación clara sobre productos financieros' })
  @Column({ length: 1000, nullable: true })
  key_needs_from_us: string;

  @ApiProperty({ example: 'Ana Morales' })
  @Column({ length: 250, nullable: true })
  core_client_name: string;

  @ApiProperty({ example: 'Ejecutiva de ventas, con enfoque en crecimiento personal' })
  @Column({ length: 1000, nullable: true })
  core_client_summary: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 1 })
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @Column({ length: 100, nullable: true })
  created_by: string;

  @ApiProperty({ example: '2025-06-09T00:00:00.000Z' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
