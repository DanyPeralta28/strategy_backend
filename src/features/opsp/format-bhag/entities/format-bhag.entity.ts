import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_bhag')
export class FormatBhag {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'bhag_id' })
  id: number;

  @ApiProperty({ example: 'Scalingsoft' })
  @Column({ length: 50 })
  id_company: string;

  @Column({ length: 50, nullable: true })
  id_entity: string;

  @ApiProperty({ example: 'Be the #1 digital bank in Central America' })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

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
