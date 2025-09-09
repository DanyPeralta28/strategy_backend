import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_cultures')
export class FormatCulture {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'culture_id' })
  id: number;

  @ApiProperty({ example: 'Scalingsoft' })
  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({ example: 'Innovation Culture' })
  @Column({ length: 150, nullable: true })
  culture_name: string;

  @ApiProperty({ example: 'We foster innovation through collaborative work and learning.' })
  @Column({ length: 2000, nullable: true })
  culture_description: string;

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
