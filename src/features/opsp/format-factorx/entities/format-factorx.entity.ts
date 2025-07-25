import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_factor_x')
export class FormatFactorX {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'factor_x_id' })
  id: number;

  @ApiProperty({ example: 'BANRURAL_GT' })
  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({
    example: [
      { step_order: 1, step_label: 'Inicio', has_inefficiency: false, symbol: '' },
      { step_order: 2, step_label: 'Recepción', has_inefficiency: true, symbol: '⚠️' },
    ],
  })
  @Column({ type: 'json' })
  process_flow_steps: object;

  @ApiProperty({
    example: [
      {
        description: 'Falta de insumos',
        leader: 'Juan Pérez',
        due_date: '2025-07-01',
      },
      {
        description: 'Demora en presupuesto',
        leader: 'Laura Gómez',
        due_date: '2025-07-15',
      },
    ],
  })
  @Column({ type: 'json', nullable: true })
  bottleneck_list: object;

  @ApiProperty({
    example: [
      {
        name: 'Expo 10X Centroamérica',
        leader: 'Ana López',
        date: '2025-08-10',
      },
    ],
  })
  @Column({ type: 'json', nullable: true })
  trade_action_list: object;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 1 })
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @Column({ length: 100 })
  created_by: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
