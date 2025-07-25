import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opsp_format_visions')
export class FormatVision {
  @PrimaryGeneratedColumn({ name: 'vision_id' })
  id: number;

  @Column({ length: 50 })
  id_company: string;

  @Column({ length: 250 })
  core_values: string;

  @Column({ length: 250 })
  brand_promises: string;

  @Column({ type: 'json', nullable: true })
  strategic_priorities_1_year: any;

  @Column({ type: 'json', nullable: true })
  strategic_priorities_3_to_5_years: any;

  @Column({ type: 'json', nullable: true })
  strategic_priorities_trimester: any;

  @Column({ length: 100 })
  user_name: string;

  @Column({ type: 'json', nullable: true })
  kpi_list: any;

  @Column({ type: 'json', nullable: true })
  priority_list: any;

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

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
