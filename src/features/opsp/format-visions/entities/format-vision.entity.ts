import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opsp_format_visions')
export class FormatVision {
  @PrimaryGeneratedColumn({ name: 'vision_id' })
  id: number;

  @Column({ length: 250 })
  core_values: string;

  @Column({ length: 250 })
  purpose: string;

  @Column({ length: 250 })
  brand_promises: string;

  @Column({ length: 250 })
  strategic_priorities_1_year: string;

  @Column({ length: 250 })
  strategic_priorities_3_to_5_years: string;

  @Column({ length: 250 })
  strategic_priorities_trimester: string;

  @Column({ length: 100 })
  user_name: string;

  @Column({ length: 250 })
  kpi_description_1: string;

  @Column({ length: 100 })
  kpi_target_1: string;

  @Column({ length: 250 })
  kpi_description_2: string;

  @Column({ length: 100 })
  kpi_target_2: string;

  @Column({ length: 250 })
  kpi_description_3: string;

  @Column({ length: 100 })
  kpi_target_3: string;

  @Column({ length: 500 })
  priority_description_1: string;

  @Column({ length: 50 })
  priority_deadline_1: string;

  @Column({ length: 500 })
  priority_description_2: string;

  @Column({ length: 50 })
  priority_deadline_2: string;

  @Column({ length: 500 })
  priority_description_3: string;

  @Column({ length: 50 })
  priority_deadline_3: string;

  @Column({ length: 500 })
  priority_description_4: string;

  @Column({ length: 50 })
  priority_deadline_4: string;

  @Column({ length: 500 })
  priority_description_5: string;

  @Column({ length: 50 })
  priority_deadline_5: string;

  @Column({ length: 100 })
  game_green_1: string;

  @Column({ length: 100 })
  game_lemon_1: string;

  @Column({ length: 100 })
  game_yellow_1: string;

  @Column({ length: 100 })
  game_red_1: string;

  @Column({ length: 100 })
  game_green_2: string;

  @Column({ length: 100 })
  game_lemon_2: string;

  @Column({ length: 100 })
  game_yellow_2: string;

  @Column({ length: 100 })
  game_red_2: string;

  @Column({ length: 250 })
  bhag: string;

  @Column({ type: 'int' })
  status: number;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ length: 50 })
  id_company: string;
}
