import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('PA.DIR_PERSONAS')
export class dir_PersonasDTO {
    @PrimaryColumn()
    COD_PERSONA: string;
    
    @Column()
    DETALLE: string;
   
    @Column()
    COD_PAIS: string;
    
    @Column()
    COD_PROVINCIA: string;
    
    @Column()
    COD_CANTON: string;

    @Column()
    ZONA: string;

    @Column()
    TIP_DIRECCION: string;

    @Column()
    ES_DEFAULT: string;
}

@Entity('PERSONAS_FISICAS')
export class per_FisicasDTO {
    @PrimaryColumn()
    COD_PER_FISICA: string;

    @Column()
    EST_CIVIL: string;

    @Column()
    TIP_DIRECCION: string;

    @Column()
    EMAIL_USUARIO: string;

    @Column()
    PROFESION: string;

    @Column()
    FEC_MODIFICACION: string;
}

@Entity('TEL_PERSONAS')
export class tel_PersonasDTO {
    @PrimaryColumn()
    COD_PERSONA: string;

    @Column()
    NUM_TELEFONO: string;

    @Column()
    TEL_PERSONAS: string;

    @Column()
    ES_DEFAULT: string;
}