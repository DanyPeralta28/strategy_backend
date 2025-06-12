import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('opsp_format_factor_x')
export class FormatFactorX {
  @PrimaryGeneratedColumn({ name: 'factor_x_id' })
  id: number;

  @Column({ length: 50, nullable: false })
  id_company: string;

  @Column({ type: 'json', nullable: false })
  process_flow_steps: object;

  @Column({ length: 1000, nullable: false })
  bottleneck_1_description: string;

  @Column({ length: 100, nullable: false })
  bottleneck_1_leader: string;

  @Column({ type: 'date', nullable: false })
  bottleneck_1_due_date: Date;

  @Column({ length: 1000, nullable: false })
  bottleneck_2_description: string;

  @Column({ length: 100, nullable: false })
  bottleneck_2_leader: string;

  @Column({ type: 'date', nullable: false })
  bottleneck_2_due_date: Date;

  @Column({ length: 1000, nullable: false })
  bottleneck_3_description: string;

  @Column({ length: 100, nullable: false })
  bottleneck_3_leader: string;

  @Column({ type: 'date', nullable: false })
  bottleneck_3_due_date: Date;

  @Column({ length: 255, nullable: false })
  trade_show_name: string;

  @Column({ length: 150, nullable: false })
  trade_show_leader: string;

  @Column({ type: 'date', nullable: false })
  trade_show_date: Date;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100, nullable: false })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
