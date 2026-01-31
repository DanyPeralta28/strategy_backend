import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_flywheels')
export class FormatFlywheel {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'fly_wheel_id' })
  id: number;

  @ApiProperty({ example: 101 })
  @Column({ type: 'int', nullable: true })
  code: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', nullable: true })
  order_item: number;

  @ApiProperty({ example: 'Generar demanda sostenible' })
  @Column({ length: 500, nullable: true })
  title: string;

  @ApiProperty({ example: 'Incrementar leads calificados' })
  @Column({ length: 250, nullable: true })
  kpi_description: string;

  @ApiProperty({ example: 'Luis Méndez' })
  @Column({ length: 150, nullable: true })
  kpi_leader: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 1 })
  status: number;

  @ApiProperty({ example: '13474' })
  @Column({ length: 100, nullable: true })
  created_by: string;

  @ApiProperty({ example: '2025-06-09T00:00:00.000Z' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({ example: '1' })
  @Column({ length: 50, nullable: false })
  id_company: string;

  @ApiProperty({ example: '1', required: false })
  @Column({ length: 50, nullable: true })
  id_entity?: string;
}
