import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cash_format_finances')
export class CashFormatFinances {
  @PrimaryGeneratedColumn({ name: 'finance_id' })
  id: number;

  @Column({ length: 50 })
  id_company: string;

  @Column({ type: 'json', nullable: true })
  evaluations_list: any;

  @Column({ type: 'json', nullable: true })
  attributes_list: any;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
