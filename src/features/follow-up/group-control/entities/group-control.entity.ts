import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follow_up_group_control')
export class GroupControl {
  @PrimaryGeneratedColumn({ name: 'id_group_control' })
  id: number;

  @Column({ nullable: true })
  game_green_group: string;

  @Column({ nullable: true })
  game_lemon_group: string;

  @Column({ nullable: true })
  game_yellow_group: string;

  @Column({ nullable: true })
  game_red_group: string;

  @Column({ nullable: true })
  game_result_group: string;

  @Column({ nullable: true })
  game_color_group: string;

  @Column({ name: 'weekly_day', type: 'varchar', length: 20, nullable: true })
  weekly_day: string;

  @Column({ name: 'weekly_time', type: 'time', nullable: true })
  weekly_time: string;

  @Column({ length: 50, nullable: true })
  id_company: string;

  @Column({ length: 50, nullable: true })
  id_entity: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'json', nullable: true })
  created_by: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
