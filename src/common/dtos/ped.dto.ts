import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PR.PR_V_PATRONOS_CORPORATIVOS')
export class PR_V_PATRONOS_CORPORATIVOS {
    @Column()
    COD_PER_FISICA: string;

    @Column()
    NUMERO_PATRONO: string;
}

@Entity('PR.PR_PATRONOS')
export class PR_PATRONOS {
    @Column()
    NUMERO_PATRONO: string;

    @Column()
    CODIGO_SEGMENTO: string;
}

@Entity('PR.PR_SEGMENTOS')
export class PR_SEGMENTOS {
    @Column()
    CODIGO_SEGMENTO: string;
}

@Entity('PR.EMPLEADOS_GOBIERNO')
export class EMPLEADOS_GOBIERNO {
    @Column()
    NUM_PATRONO: string;

    @Column()
    CEDULA: string;
}