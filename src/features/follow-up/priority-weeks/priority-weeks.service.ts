import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowUpPriorityWeeks } from './entities/priority-week.entity';
import { FollowUpStartWeeks } from './entities/start-week.entity';
import {
  CreateFollowUpPriorityWeeksDto,
} from './dto/create-priority-week.dto';
import {
  UpdateFollowUpPriorityWeeksDto,
} from './dto/update-priority-week.dto';
import { In } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class FollowUpPriorityWeeksService {
  constructor(
    @InjectRepository(FollowUpPriorityWeeks)
    private readonly repo: Repository<FollowUpPriorityWeeks>,
  ) { }

  async create(dto: CreateFollowUpPriorityWeeksDto) {
    try {
      const result = await this.repo.insert(dto);
      return {
        data: { id: result.identifiers[0].id },
        message: 'OK',
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          data: null,
          message: `Internal Server Error: ${error.message}`,
          statusCode: 500,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(id_company: string) {
    try {
      const results = await this.repo.find({
        where: { id_company, status: 1 },
      });
      return { data: results, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          data: null,
          message: `Internal Server Error: ${error.message}`,
          statusCode: 500,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.repo.findOne({ where: { id, status: 1 } });
      if (!result) {
        throw new HttpException(
          {
            data: null,
            message: 'Priority Week record not found',
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return { data: result, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          data: null,
          message: `Internal Server Error: ${error.message}`,
          statusCode: 500,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateFollowUpPriorityWeeksDto) {
    try {
      const existing = await this.repo.findOne({ where: { id, status: 1 } });
      if (!existing) {
        throw new HttpException(
          {
            data: null,
            message: 'Priority Week record not found',
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.repo.update(id, dto);
      return { data: { id }, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          data: null,
          message: `Internal Server Error: ${error.message}`,
          statusCode: 500,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.repo.findOne({ where: { id, status: 1 } });
      if (!existing) {
        throw new HttpException(
          {
            data: null,
            message: 'Priority Week record not found',
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.repo.update(id, { status: 0 });
      return { data: { id }, message: 'Deleted successfully', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          data: null,
          message: `Internal Server Error: ${error.message}`,
          statusCode: 500,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCustomView(id_company: string, id_entity: string, team: string, week: number) {
    try {
      const config = await this.repo.manager.findOne(FollowUpStartWeeks, {
        where: { id_company, id_entity, status: 1 },
        order: { created_at: 'DESC' },
      });
      if (!config || ![1, 2].includes(config.id_view_list)) {
        throw new HttpException({ data: null, message: 'Invalid configuration', statusCode: 404 }, HttpStatus.NOT_FOUND);
      }

      const key = config.id_view_list === 1 ? 'priority_list_quality' : 'priority_list_quantity';
      const otherKey = key === 'priority_list_quality' ? 'priority_list_quantity' : 'priority_list_quality';

      const registros = await this.repo.createQueryBuilder('r')
        .select([
          'r.id',
          'r.priority_list_quality',
          'r.priority_list_quantity',
          'r.game_green_priority',
          'r.game_lemon_priority',
          'r.game_yellow_priority',
          'r.game_red_priority',
          'r.game_result_priority',
          'r.game_color_priority',
          'r.quarter_priority_list',
          'r.id_company',
          'r.team',
          'r.id_entity',
          'r.status',
          'r.created_by',
          'r.created_at',
        ])
        .where('r.id_company = :id_company AND r.id_entity = :id_entity AND r.team = :team AND r.status = 1',
          { id_company, id_entity, team })
        .orderBy('r.created_at', 'DESC')
        .getMany();

      const weekNum = Number(week);
      const dataFiltrada = registros.map((registro: any) => {
        const { [otherKey]: _omit, ...rest } = registro;
        const lista = Array.isArray(rest[key]) ? rest[key] : [];
        const listaSemana = lista.filter((item: any) => Number(item?.noWeek) === weekNum);
        return { ...rest, [key]: listaSemana };
      });

      const hayCoincidencias = dataFiltrada.some((r: any) => Array.isArray(r[key]) && r[key].length > 0);
      if (!hayCoincidencias) {
        throw new HttpException({ data: null, message: `No priorities found for week ${week}`, statusCode: 404 }, HttpStatus.NOT_FOUND);
      }

      // IDs de usuario desde created_by.user_id
      const userIds = Array.from(
        new Set(
          dataFiltrada.map((r: any) => Number(r?.created_by?.user_id)).filter((n) => Number.isFinite(n)),
        ),
      );

      // Repo de usuarios
      const userRepo = this.repo.manager.getRepository(User);
      const usuarios = userIds.length
        ? await userRepo.find({
          select: ['id_user', 'firstname', 'lastname', 'level_user', 'team'],
          where: { id_user: In(userIds), status: 1, team }, // ya filtramos por team del parámetro
        })
        : [];

      const mapUsers = new Map<number, User>(usuarios.map((u) => [u.id_user, u]));

      const data = dataFiltrada.map((r: any) => {
        const uid = Number(r?.created_by?.user_id);
        const u = Number.isFinite(uid) ? mapUsers.get(uid) : undefined;

        // verificación extra: usuario.team debe igualar registro.team y parámetro
        const created_by_user =
          u && u.team === r.team && u.team === team
            ? {
              id_user: u.id_user,
              level_user: u.level_user ?? null,
              firstname: u.firstname ?? null,
              lastname: u.lastname ?? null,
              team: u.team ?? null,
            }
            : null;

        return { ...r, created_by_user };
      });

      return { data, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async getPrioritiesIds(id_company: string, id_entity: string, team: string, id_users: string,) {
    try {
      const userIds = id_users
        .split(',')
        .map((x) => x.trim())
        .filter((x) => x !== '')
        .map((x) => Number(x))
        .filter((n) => Number.isFinite(n));

      if (userIds.length === 0) {
        return { data: [], message: 'OK', statusCode: 200 };
      }

      // Selección dinámica: todas las columnas menos las excluidas
      const exclude = new Set(['priority_list_quality', 'priority_list_quantity']);
      const selectCols = this.repo.metadata.columns
        .map((c) => c.propertyPath)                // nombres de propiedad en la entidad
        .filter((name) => !exclude.has(name))
        .map((name) => `f.${name}`);               // alias f

      const data = await this.repo
        .createQueryBuilder('f')
        .select(selectCols)
        .where('f.status = :status', { status: 1 })
        .andWhere('f.id_company = :id_company', { id_company })
        .andWhere('f.id_entity = :id_entity', { id_entity })
        .andWhere('f.team = :team', { team })
        .andWhere(
          `
        CAST(
          JSON_UNQUOTE(JSON_EXTRACT(f.created_by, '$.user_id'))
          AS UNSIGNED
        ) IN (:...userIds)
        `,
          { userIds },
        )
        .orderBy('f.created_at', 'DESC')
        .getMany();

      return { data, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        {
          data: null,
          message: `Internal Server Error: ${error.message}`,
          statusCode: 500,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
