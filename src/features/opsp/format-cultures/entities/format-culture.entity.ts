import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_cultures')
export class FormatCulture {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'culture_id' })
  id: number;

  @ApiProperty({ example: '1' })
  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({ example: '1', required: false })
  @Column({ length: 50, nullable: true })
  id_entity?: string;

  @ApiProperty({ example: 'Innovation Culture' })
  @Column({ length: 500, nullable: true })
  culture_name: string;

  @ApiProperty({ example: 'We foster innovation through collaborative work and learning.' })
  @Column({ type: 'text', nullable: true })

  culture_description: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', default: 1 })
  status: number;

  @ApiProperty({ example: '13474' })
  @Column({ length: 100 })
  created_by: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
