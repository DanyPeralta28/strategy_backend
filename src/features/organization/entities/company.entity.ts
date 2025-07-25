import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { AppEntity  } from './entity.entity';

@Entity('companies')
export class Company {
  @PrimaryColumn()
  id_company: number;

  @Column()
  name_company: string;

  @OneToMany(() => AppEntity, (entity) => entity.company)
  entities: AppEntity[];
}
