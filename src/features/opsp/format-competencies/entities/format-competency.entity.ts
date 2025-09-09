import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_key_competencies')
export class FormatCompetency {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'competencies_id' })
  id: number;

  @ApiProperty({ example: 'Scalingsoft' })
  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({ example: 'Customer Service' })
  @Column({ length: 250, nullable: true })
  core_competency: string;

  @ApiProperty({ example: 'Ability to serve internal and external clients' })
  @Column({ length: 1000, nullable: true })
  competency_description: string;

  @ApiProperty({ example: ['Empathy', 'Active Listening', 'Problem Solving'] })
  @Column({ type: 'json', nullable: true })
  competencies_list: any;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 1 })
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @Column({ length: 100 })
  created_by: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
