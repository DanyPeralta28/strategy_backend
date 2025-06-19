import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('opsp_format_brand_promises')
export class FormatBrandPromise {
  @PrimaryGeneratedColumn({ name: 'brand_promise_id' })
  id: number;

  @Column({ length: 50, nullable: false })
  id_company: string;

  @Column({ length: 1000, nullable: false })
  primary_promise: string;

  @Column({ length: 1000, nullable: false })
  secondary_promise: string;

  @Column({ length: 1000, nullable: false })
  tertiary_promise: string;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ length: 100, nullable: false })
  created_by: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
