// users.entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ name: 'id_user', type: 'int' })
  id_user: number;

  @Column({ name: 'firstname', type: 'varchar', length: 50, nullable: true })
  firstname?: string;

  @Column({ name: 'lastname', type: 'varchar', length: 50, nullable: true })
  lastname?: string;

  @Column({ name: 'level_user', type: 'int', nullable: true })
  level_user?: number;

  @Column({ name: 'team', type: 'varchar', length: 50, nullable: true })
  team?: string;

  @Column({ name: 'status', type: 'int', nullable: true })
  status?: number;
}
