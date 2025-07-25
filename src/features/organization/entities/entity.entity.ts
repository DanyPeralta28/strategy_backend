import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { User } from './user.entity';

@Entity('entities')
export class AppEntity  {
  @PrimaryColumn()
  id_entity: number;

  @Column()
  name_entity: string;

   @Column({ type: 'int', default: 1 })
  status: number;

  @ManyToOne(() => Company, (company) => company.entities)
  @JoinColumn({ name: 'id_company' })
  company: Company;

  @OneToMany(() => User, (user) => user.entity)
  users: User[];
}
