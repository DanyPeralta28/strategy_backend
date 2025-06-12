import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opsp_format_7_stratas')
export class FormatStrata {
  @PrimaryGeneratedColumn({ name: 'strata_id' })
  id: number;

  @Column({ length: 50 })
  id_company: string;

  @Column({ length: 1000, nullable: true })
  own_words: string;

  @Column({ length: 1000, nullable: true })
  core_client_description: string;

  @Column({ length: 1000, nullable: true })
  products_and_services: string;

  @Column({ length: 500, nullable: true })
  geographic_area: string;

  @Column({ length: 1000, nullable: true })
  brand_promises_with_kpis: string;

  @Column({ length: 1000, nullable: true })
  brand_promise_guarantee: string;

  @Column({ length: 1000, nullable: true })
  strategy_one_liner: string;

  @Column({ length: 1000, nullable: true })
  diff_acitivities: string;

  @Column({ length: 1000, nullable: true })
  factor_x_advantage: string;

  @Column({ length: 500, nullable: true })
  profit_per_x: string;

  @Column({ length: 1000, nullable: true })
  bhag_long_goal: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100, nullable: true })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
