import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opsp_format_win_game_dashboard')
export class WinGameDashboard {
  @PrimaryGeneratedColumn({ name: 'game_id' })
  id: number;

  @Column({ length: 50 })
  id_company: string;

  @Column({ length: 50, nullable: true })
  id_entity?: string;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ length: 255, nullable: true })
  team: string;

  @Column({ length: 255, nullable: true })
  game_rules: string;

  @Column({ length: 255, nullable: true })
  scoreboard: string;

  @Column({ length: 255, nullable: true })
  celebration_plan: string;

  @Column({ length: 255, nullable: true })
  reward: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
