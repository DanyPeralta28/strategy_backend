import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { FormatWww } from './entities/format_www.entity';
import { CreateFormatWwwDto } from './dto/create-format_www.dto';
import { UpdateFormatWwwDto } from './dto/update-format_www.dto';
import { BulkCreateFormatWwwDto } from './dto/bulk-create-format_www.dto';
import { OrgRelationsService } from '../../org-relations/org-relations.service';

type VisibleFilter = {
  id_company: string;
  id_entity: string;
  requester_user_id: number;
  preset?: 'meeting' | 'overdue';
  statuses?: string;
  team_scope?: 'my' | 'led'; // default: 'my'
};

@Injectable()
export class FormatWwwService {
  constructor(
    @InjectRepository(FormatWww)
    private readonly repo: Repository<FormatWww>,
    private readonly org: OrgRelationsService,
    private readonly ds: DataSource, // transacciones (bulk)
  ) { }

  async createMany(dto: BulkCreateFormatWwwDto) {
    try {
      const { items } = dto;

      if (!items?.length) {
        throw new HttpException(
          { data: null, message: 'No items to insert', statusCode: 400 },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (items.length > 1000) {
        throw new HttpException(
          { data: null, message: 'Too many items (max 1000)', statusCode: 400 },
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.ds.transaction(async manager => {
        const insertRes = await manager
          .createQueryBuilder()
          .insert()
          .into(FormatWww)
          .values(items)
          .execute();

        const ids = insertRes.identifiers
          .map((x: any) => x.id ?? x.www_id)
          .filter(Boolean);

        return { ids, inserted: ids.length };
      });

      return { data: result, message: 'OK', statusCode: 201 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async findAll(id_company: string, id_entity?: string) {
    try {
      const results = await this.repo.find({ where: { id_company, id_entity, status: 1 } as any });
      return { data: results, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllVisibleWithFilters(f: VisibleFilter) {
    try {
      const me = await this.org.getUserCore(f.requester_user_id);
      if (!me) {
        throw new HttpException(
          { data: null, message: 'User not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }

      const qb = this.repo.createQueryBuilder('w')
        .where('w.status = 1')
        .andWhere('w.id_company = :id_company', { id_company: f.id_company });
      if (f.id_entity) {
        qb.andWhere('w.id_entity = :id_entity', { id_entity: f.id_entity });
      }

      const todayISO = new Date().toISOString().slice(0, 10);

      if (f.preset === 'meeting') {
        // Reunión: todo excepto Ejecutado, desde hoy hacia atrás
        qb.andWhere("w.www_status <> 'Ejecutado'")
          .andWhere('COALESCE(w.new_when, w.when) <= :today', { today: todayISO });
      } else {
        // Inicial: vencidos (<= hoy) y NO en 'En proceso' ni 'Atrasado' ni 'Ejecutado'
        qb.andWhere('COALESCE(w.new_when, w.when) <= :today', { today: todayISO })
          .andWhere('w.www_status NOT IN (:...excluded)', {
            excluded: ['En proceso', 'Atrasado', 'Ejecutado'],
          });
      }

      if (f.statuses) {
        const sts = f.statuses.split(',').map(s => s.trim()).filter(Boolean);
        if (sts.length) qb.andWhere('w.www_status IN (:...sts)', { sts });
      }

      // Restringir por alcance de equipo SOLO si NO es admin (level 2)
      if (me.level_user !== 2) {
        // default: 'my' (mi equipo); 'led' = equipo que lidero (subordinados)
        const scope: 'my' | 'led' = f.team_scope === 'led' ? 'led' : 'my';

        let creatorIds: number[] = [];
        if (scope === 'led') {
          // Subordinados directos
          const juniors = await this.org.getDirectReportsOf(f.requester_user_id, {
            includeSelf: true,            // respeta tu configuración actual
            sameCompanyAndEntityOnly: true,
            activeOnly: true,
          });
          creatorIds = juniors.map(j => j.id_user);
        } else {
          // Mis pares (mismo(s) jefe(s)) + yo
          const peers = await this.org.getPeersByBossGraph(f.requester_user_id, {
            includeSelf: true,
            sameCompanyAndEntityOnly: true,
            activeOnly: true,
          });
          creatorIds = peers.map(p => p.id_user);
        }
        console.log('>>> creatorIds:', creatorIds);

        if (!creatorIds.length) {
          return { data: [], meta: { total: 0 }, message: 'OK', statusCode: 200 };
        }

        // created_by almacena el user_id como string → casteamos
        qb.andWhere('TRIM(w.created_by) IN (:...allowedStr)', {
          allowedStr: creatorIds.map(String),
        });
      }
      // ⬆️ Admin (level 2) ve todo dentro de la compañía + presets/estatus

      const rows = await qb.getMany();
      return { data: rows, meta: { total: rows.length }, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.repo.findOne({ where: { id, status: 1 } as any });
      if (!result) {
        throw new HttpException(
          { data: null, message: 'Format WWW not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }
      return { data: result, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateFormatWwwDto) {
    try {
      const existing = await this.repo.findOne({ where: { id, status: 1 } as any });
      if (!existing) {
        throw new HttpException(
          { data: null, message: 'Format WWW not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.repo.update(id, dto);
      return { data: { id }, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.repo.findOne({ where: { id, status: 1 } as any });
      if (!existing) {
        throw new HttpException(
          { data: null, message: 'Format WWW not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.repo.update(id, { status: 0 } as any);
      return { data: { id }, message: 'Deleted successfully', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
