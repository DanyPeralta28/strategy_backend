import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('execution_survey_campaign')
export class ExecutionSurveyCampaign {
  @PrimaryGeneratedColumn({ name: 'survey_campaign_id' })
  id: number;

  @Column({ length: 100, nullable: true })
  created_by?: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ length: 50, name: 'id_company' })
  id_company: string;
}
