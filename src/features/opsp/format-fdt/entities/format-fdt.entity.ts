import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opsp_format_fdt')
export class FormatFdt {
  @PrimaryGeneratedColumn({ name: 'fdt_id' })
  id: number;

  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({ example: '1', required: false })
  @Column({ length: 50, nullable: true })
  id_entity?: string;

  /*  Las tres columnas cambiaron a tipo JSON  */
  @Column({ type: 'json', nullable: true })
  global_trends_impact: any;

  @Column({ type: 'json', nullable: true })
  core_strengths: any;

  @Column({ type: 'json', nullable: true })
  core_weaknesses: any;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100 })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
