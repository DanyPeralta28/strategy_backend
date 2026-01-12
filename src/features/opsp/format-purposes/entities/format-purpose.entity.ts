import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_purposes')
export class FormatPurpose {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'purposes_id' })
  id: number;

  @ApiProperty({ example: 'Scalingsoft' })
  @Column({ length: 50, nullable: true })
  id_company: string;

  @ApiProperty({ example: 'Entity001', required: false })
  @Column({ length: 50, nullable: true })
  id_entity?: string;

  @ApiProperty({ example: 'Our goal is to expand operations in Central America' })
  @Column({ length: 500, nullable: true })
  purpose_description: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 1 })
  status: number;

  @ApiProperty({ example: 'admin_user' })
  @Column({ length: 100, nullable: true })
  created_by: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
