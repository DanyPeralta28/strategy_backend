import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opsp_format_consistent_actions')
export class ConsistentAction {
  @PrimaryGeneratedColumn({ name: 'action_id' })
  id: number;

  @Column({ length: 50 })
  id_company: string;

  /** Lista de acciones en formato JSON */
  @Column({ type: 'json', nullable: true })
  action: any[];

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
