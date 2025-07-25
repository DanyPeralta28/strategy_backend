import { Entity, Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity('bosses')
export class Boss {
  @PrimaryGeneratedColumn()
  id_boss: number;

  @Column()
  id_userBoss: number;

  @Column()
  id_userJunior: number;
}
