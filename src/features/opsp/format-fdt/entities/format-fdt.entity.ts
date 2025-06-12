import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opsp_format_fdt')
export class FormatFdt {
  @PrimaryGeneratedColumn({ name: 'fdt_id' })
  id: number;

  @Column({ length: 50, nullable: true })
  id_company: string;

  @Column({ length: 2000, nullable: true })
  global_trends_impact: string;

  @Column({ length: 2000, nullable: true })
  core_strengths: string;

  @Column({ length: 2000, nullable: true })
  core_weaknesses: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100, nullable: true })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
