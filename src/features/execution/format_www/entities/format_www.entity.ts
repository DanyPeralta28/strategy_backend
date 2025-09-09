import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('execution_format_www')
export class FormatWww {
  @PrimaryGeneratedColumn({ name: 'www_id' })
  id: number;

  @Column({ name: 'what', length: 250, nullable: true })
  what: string | null;

  @Column({ name: 'who', length: 250, nullable: true })
  who: string | null;

  @Column({ name: 'when', type: 'date', nullable: true })
  when: string | null; // YYYY-MM-DD

  @Column({ name: 'www_status', length: 250, nullable: true })
  www_status: string | null;

  @Column({ name: 'new_when', type: 'date', nullable: true })
  new_when: string | null; // YYYY-MM-DD

  @Column({ name: 'created_by', length: 100, nullable: true })
  created_by: string | null; // guarda id_user como string

  @Column({ name: 'status', type: 'int', nullable: true, default: 1 })
  status: number | null;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  created_at: Date | null;

  @Column({ name: 'id_company', length: 50, nullable: true })
  id_company: string | null;
}
