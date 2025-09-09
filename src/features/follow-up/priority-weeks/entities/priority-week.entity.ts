import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follow_up_priority_weeks')
export class FollowUpPriorityWeeks {
  @PrimaryGeneratedColumn({ name: 'id_priority_weeks' })
  id: number;

  @Column({ type: 'json', nullable: true })
  priority_list_quality: any[];

  @Column({ type: 'json', nullable: true })
  priority_list_quantity: any[];

  @Column({ length: 255, nullable: true })
  game_green_kpi: string;

  @Column({ length: 255, nullable: true })
  game_lemon_kpi: string;

  @Column({ length: 255, nullable: true })
  game_yellow_kpi: string;

  @Column({ length: 255, nullable: true })
  game_red_kpi: string;

  @Column({ length: 255, nullable: true })
  game_result_kpi: string;

  @Column({ length: 255, nullable: true })
  game_color_kpi: string;

  @Column({ length: 255, nullable: true })
  game_green_priority: string;

  @Column({ length: 255, nullable: true })
  game_lemon_priority: string;

  @Column({ length: 255, nullable: true })
  game_yellow_priority: string;

  @Column({ length: 255, nullable: true })
  game_red_priority: string;

  @Column({ length: 255, nullable: true })
  game_result_priority: string;

  @Column({ length: 255, nullable: true })
  game_color_priority: string;

  @Column({ type: 'json', nullable: true })
  kpi_list: any[];

  @Column({ type: 'json', nullable: true })
  quarter_priority_list: any[];

  @Column({ length: 50, nullable: true })
  id_company: string;

  @Column({ length: 50, nullable: true })
  team: string;

  @Column({ length: 50, nullable: true })
  id_entity: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'json', nullable: true })
  created_by: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
