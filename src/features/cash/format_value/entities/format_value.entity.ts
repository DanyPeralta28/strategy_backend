import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cash_format_value')
export class CashFormatValue {
  @PrimaryGeneratedColumn({ name: 'value_id' })
  id: number;

  @Column({ length: 50 })
  id_company: string;

  @Column({ type: 'json', nullable: true })
  area_list: any;

  @Column({ type: 'json', nullable: true })
  priority_list: any;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
