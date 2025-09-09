import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_core_values')
export class FormatCoreValue {
  @PrimaryGeneratedColumn({ name: 'core_value_id' })
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ length: 150, nullable: true })
  @ApiProperty({ example: 'Integridad', maxLength: 150 })
  value_title: string;

  @Column({ length: 500, nullable: true })
  @ApiProperty({ example: 'Actuamos con ética y transparencia', maxLength: 500 })
  short_description: string;

  @Column({ length: 2000, nullable: true })
  @ApiProperty({ example: 'Nuestra empresa fomenta la honestidad como pilar...', maxLength: 2000 })
  long_description: string;

  @Column({ type: 'int', default: 1 })
  @ApiProperty({ example: 1 })
  status: number;

  @Column({ length: 100, nullable: true })
  @ApiProperty({ example: 'admin_user', maxLength: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2025-06-11T20:45:00Z' })
  created_at: Date;

  @Column({ length: 50, nullable: true })
  @ApiProperty({ example: 'Scalingsoft', maxLength: 50 })
  id_company: string;
}
