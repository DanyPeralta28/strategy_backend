import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('opsp_format_territories')
export class FormatTerritory {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'territory_id' })
  id: number;

  @ApiProperty({ example: 'Scalingsoft' })
  @Column({ length: 50 })
  id_company: string;

  @Column({ length: 50, nullable: true })
  id_entity: string;

  @ApiProperty({ example: '' })
  @Column({ type: 'json', nullable: true })
  geographic_location: any[];

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
