import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_goals')
export class FormatGoal {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'goals_id' })
  id: number;

  @ApiProperty({ example: 'Scalingsoft' })
  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({ type: 'object', description: 'Metas a 3–5 años' })
  @Column({ type: 'json', nullable: true })
  three_to_five_years: any;

  @ApiProperty({ type: 'object', description: 'Metas a 1 año' })
  @Column({ type: 'json', nullable: true })
  one_year: any;

  @ApiProperty({ type: 'json', description: 'Trimestre 1' })
  @Column({ type: 'json', nullable: true })
  trimester_one: any;

  @ApiProperty({ type: 'json', description: 'Trimestre 2' })
  @Column({ type: 'json', nullable: true })
  trimester_two: any;

  @ApiProperty({ type: 'json', description: 'Trimestre 3' })
  @Column({ type: 'json', nullable: true })
  trimester_three: any;

  @ApiProperty({ type: 'json', description: 'Trimestre 4' })
  @Column({ type: 'json', nullable: true })
  trimester_four: any;

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
