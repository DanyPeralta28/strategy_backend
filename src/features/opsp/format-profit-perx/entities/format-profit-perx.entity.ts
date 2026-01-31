import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('opsp_format_profit_per_x')
export class FormatProfitPerX {
  @PrimaryGeneratedColumn({ name: 'profit_per_x_id' })
  id: number;

  @Column({ length: 50, nullable: false })
  id_company: string;

 @ApiProperty({ example: '1', required: false })
  @Column({ length: 50, nullable: true })
  id_entity?: string;

  @Column({ type: 'text', nullable: true })
  profit_per_x_definition: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100, nullable: false })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
