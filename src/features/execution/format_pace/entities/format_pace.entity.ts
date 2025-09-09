import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('execution_format_pace')
export class FormatPace {
  @PrimaryGeneratedColumn({ name: 'pace_id' })
  id: number;

  @Column({ length: 100 })
  process_name: string;

  @Column({ length: 250 })
  person_in_charge_name: string;

  @Column({ type: 'json', nullable: true })
  kpi_list: any;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ length: 50 })
  id_company: string;
}
