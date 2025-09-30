import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('execution_survey_answers')
export class ExecutionSurveyAnswer {
  @PrimaryGeneratedColumn({ name: 'survey_answer_id' })
  id: number;

  @Column({ type: 'json', nullable: true }) segment_1: any;
  @Column({ type: 'json', nullable: true }) segment_2: any;
  @Column({ type: 'json', nullable: true }) segment_3: any;
  @Column({ type: 'json', nullable: true }) segment_4: any;
  @Column({ type: 'json', nullable: true }) segment_5: any;
  @Column({ type: 'json', nullable: true }) segment_6: any;
  @Column({ type: 'json', nullable: true }) segment_7: any;
  @Column({ type: 'json', nullable: true }) segment_8: any;
  @Column({ type: 'json', nullable: true }) segment_9: any;
  @Column({ type: 'json', nullable: true }) segment_10: any;

  @Column({ type: 'int', default: 1 })
  id_campaign: number;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ length: 50, name: 'id_company' })
  id_company: string;

  @Column({ length: 50, nullable: true })
  id_entity: string;
}
