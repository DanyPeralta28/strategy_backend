import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_7_stratas')
export class FormatStrata {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'strata_id' })
  id: number;

  @ApiProperty({ example: 'BANRURAL_GT' })
  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({ example: 'En mis palabras: brindamos soluciones integrales.' })
  @Column({ length: 1000, nullable: true })
  own_words: string;

  @ApiProperty({ example: 'Consultoría estratégica, formación ejecutiva.' })
  @Column({ length: 1000, nullable: true })
  products_and_services: string;

  @ApiProperty({ example: 'Guatemala, Honduras y El Salvador.' })
  @Column({ length: 500, nullable: true })
  geographic_area: string;


  @ApiProperty({ example: 'Devolución si no se cumplen los tiempos.' })
  @Column({ length: 1000, nullable: true })
  brand_promise_guarantee: string;

  @ApiProperty({ example: 'Simplificamos la transformación empresarial.' })
  @Column({ length: 1000, nullable: true })
  strategy_one_liner: string;

  @ApiProperty({
    example: [
      { title: 'Capacitación exclusiva a socios', value: 'Mensual' },
      { title: 'Auditorías semestrales de valor', value: 'Incluido' }
    ]
  })
  @Column({ type: 'json', nullable: true })
  diff_acitivities: { title: string; value: string }[];

  @ApiProperty({ example: 'Expertise sectorial consolidado' })
  @Column({ length: 1000, nullable: true })
  factor_x_advantage: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 1 })
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @Column({ length: 100, nullable: true })
  created_by: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
