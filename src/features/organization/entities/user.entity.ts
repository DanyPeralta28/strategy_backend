import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AppEntity  } from './entity.entity';

@Entity('users')
export class User {
  @PrimaryColumn()
  id_user: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  team: string;

  @Column()
  level_user: number;

  @ManyToOne(() => AppEntity, (entity) => entity.users)
  @JoinColumn({ name: 'id_entity' })
  entity: AppEntity;
}
