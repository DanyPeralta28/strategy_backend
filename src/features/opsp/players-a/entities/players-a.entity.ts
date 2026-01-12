// players-a.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opsp_format_players_a')
export class PlayerA {
  @PrimaryGeneratedColumn({ name: 'player_id' })
  id: number;

  @Column({ length: 50 })
  id_company: string;

  @Column({ length: 50, nullable: true })
  id_entity?: string;

  @Column({ length: 10, nullable: true })
  reward: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
