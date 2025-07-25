import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('follow_up_start_weeks')
export class FollowUpStartWeeks {
  @PrimaryGeneratedColumn({ name: 'id_start_week' })
  id: number;

  @Column({ type: 'date', nullable: true })
  date_start: Date;

  @Column({ type: 'int', nullable: true })
  id_view_list: number;

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
