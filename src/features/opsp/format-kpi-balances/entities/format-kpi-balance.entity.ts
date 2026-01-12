import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_kpi_balances')
export class FormatKpiBalance {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'balance_id' })
  id: number;

  @ApiProperty({ example: 'Scalingsoft' })
  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({ example: 'Entity001', required: false })
  @Column({ length: 50, nullable: true })
  id_entity?: string;

  @ApiProperty({ example: { engagement: 85, satisfaction: 90 } })
  @Column({ type: 'json' })
  employee_balance: any;

  @ApiProperty({ example: { loyalty: 80, referrals: 60 } })
  @Column({ type: 'json', nullable: true })
  customer_balance: any;

  @ApiProperty({ example: { dividends: 50, growth: 70 } })
  @Column({ type: 'json', nullable: true })
  shareholder_balance: any;

  @ApiProperty({ example: { programs: 3, hours: 120 } })
  @Column({ type: 'json', nullable: true })
  training_balance: any;

  @ApiProperty({ example: { campaigns: 5, conversion: 20 } })
  @Column({ type: 'json', nullable: true })
  sales_marketing_balance: any;

  @ApiProperty({ example: { cost_efficiency: 92 } })
  @Column({ type: 'json', nullable: true })
  administration_balance: any;

  @ApiProperty()
  @Column({ type: 'date' })
  compliance_date: Date;

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
