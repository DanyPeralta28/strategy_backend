import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_territories')
export class FormatTerritory {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'territory_id' })
  id: number;

  @ApiProperty({ example: 'BANRURAL_GT' })
  @Column({ length: 50 })
  id_company: string;

  @ApiProperty({ example: 'Western Highlands' })
  @Column({ length: 250, nullable: true })
  geographic_location: string;

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
