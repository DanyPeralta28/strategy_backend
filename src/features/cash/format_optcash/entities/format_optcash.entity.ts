import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cash_format_optcash')
export class CashFormatOptcash {
  @PrimaryGeneratedColumn({ name: 'idea_id' })
  id: number;

  @Column({ length: 50 })
  id_company: string;

  @Column({ type: 'json', nullable: true })
  idea_a_list: any;

  @Column({ type: 'json', nullable: true })
  idea_b_list: any;

  @Column({ type: 'json', nullable: true })
  idea_c_list: any;

  @Column({ type: 'json', nullable: true })
  idea_d_list: any;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
