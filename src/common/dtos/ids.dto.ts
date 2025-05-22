import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PA.ID_PERSONAS')
export class idsDTO {
    @PrimaryGeneratedColumn()
    COD_PERSONA: string;

    @Column()
    COD_TIPO_ID: string;

    @Column()
    NUM_ID: string;

    @Column()
    FEC_VENCIMIENTO: Date;

    @Column()
    LUGAR_EMISION: string;

    @Column()
    COD_PROVINCIA: string;

    @Column()
    COD_CANTON: string;

    @Column()
    COD_PAIS: string;

    @Column()
    FECHA_EMISION: string;    
}