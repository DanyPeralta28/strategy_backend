import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('execution_format_face')
export class FormatFace {
  @PrimaryGeneratedColumn({ name: 'face_id' })
  id: number;

  @Column({ length: 100 })
  function_name: string;

  @Column({ length: 250 })
  accountable_name: string;

  @Column({ type: 'json', nullable: true })
  kpi_list: any;

  @Column({ type: 'json', nullable: true })
  results_list: any;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ length: 50 })
  id_company: string;
}
