import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_goals')
export class FormatGoal {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'goals_id' })
  id: number;

  @ApiProperty({ example: '2025' })
  @Column({ length: 10, nullable: true })
  fiscal_year: string;

  @ApiProperty({ example: 'Q2' })
  @Column({ length: 25, nullable: true })
  quarter: string;

  @ApiProperty({ example: 'A', description: 'Type of goal (e.g. A, B, C)' })
  @Column({ length: 1, nullable: true })
  type: string;

  @ApiProperty({ example: 1200000.50 })
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  revenue: number;

  @ApiProperty({ example: 150000.75 })
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  profit: number;

  @ApiProperty({ example: 45.75 })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  gross_margin: number;

  @ApiProperty({ example: 500000.00 })
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  cash: number;

  @ApiProperty({ example: 30 })
  @Column({ type: 'int', nullable: true })
  days_receivable: number;

  @ApiProperty({ example: 60 })
  @Column({ type: 'int', nullable: true })
  inventory_turnover_days: number;

  @ApiProperty({ example: 100000.00 })
  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  revenue_per_employee: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 1 })
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @Column({ length: 100, nullable: true })
  created_by: string;

  @ApiProperty({  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({ example: 'BANRURAL_GT' })
  @Column({ length: 50, nullable: true })
  id_company: string;
}
