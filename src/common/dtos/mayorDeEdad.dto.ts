import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('PA.PERSONAS_FISICAS')
export class PersonasMayorEdad {
    @PrimaryColumn()
    COD_PER_FISICA: string;

    @Column()
    FEC_NACIMIENTO: Date;
}