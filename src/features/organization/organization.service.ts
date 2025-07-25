import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppEntity } from './entities/entity.entity';
import { User } from './entities/user.entity';
import { Boss } from './entities/bosses.entity';

@Injectable()
export class TeamViewerService {
  constructor(
    @InjectRepository(AppEntity)
    private readonly entityRepo: Repository<AppEntity>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Boss)
    private readonly bossRepo: Repository<Boss>,
  ) { }

  async getEntitiesByCompany(companyId: number) {
    try {
      const result = await this.entityRepo.find({
        where: { company: { id_company: companyId }, status: 1 },
      });

      if (!result.length) {
        throw new HttpException(
          {
            data: null,
            message: `No entities found for company ID ${companyId}`,
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        data: result,
        message: 'OK',
        statusCode: 200,
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

  async getTeamsByBossInEntity(
    userId: number,
    entityId: number,
    companyId: number,
  ) {
    try {
      const bossUser = await this.userRepo.findOne({
        where: { id_user: userId },
        select: ['level_user'],
      });

      if (!bossUser) {
        throw new HttpException(
          {
            data: null,
            message: `User with ID ${userId} not found`,
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // Si el usuario es nivel 2, agrupar directamente por team
      if (bossUser.level_user === 2) {
        const teamsLevel2 = await this.userRepo
          .createQueryBuilder('user')
          .select('user.team', 'team')
          .innerJoin('user.entity', 'entity')
          .innerJoin('entity.company', 'company')
          .where('user.status = :status', { status: 1 })
          .andWhere('entity.id_entity = :entityId', { entityId })
          .andWhere('company.id_company = :companyId', { companyId })
          .groupBy('user.team')
          .getRawMany();

        if (!teamsLevel2.length) {
          throw new HttpException(
            {
              data: null,
              message: `No teams found for level 2 user in entity ${entityId} and company ${companyId}`,
              statusCode: 404,
            },
            HttpStatus.NOT_FOUND,
          );
        }

        const teams = teamsLevel2.map(row => row.team);
        return {
          data: teams,
          message: 'OK',
          statusCode: 200,
        };
      }

      // Paso 1: obtener los ID de los juniors de este jefe
      const bosses = await this.bossRepo.find({
        where: { id_userBoss: userId },
        select: ['id_userJunior'],
      });

      const juniorIds = bosses.map(b => b.id_userJunior);

      if (!juniorIds.length) {
        throw new HttpException(
          {
            data: null,
            message: `No users found under boss ID ${userId}`,
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // Paso 2: buscar los teams de esos juniors
      const result = await this.userRepo
        .createQueryBuilder('user')
        .select('user.team', 'team')
        .innerJoin('user.entity', 'entity')
        .innerJoin('entity.company', 'company')
        .where('user.id_user IN (:...juniorIds)', { juniorIds })
        .andWhere('user.status = :status', { status: 1 })
        .andWhere('entity.id_entity = :entityId', { entityId })
        .andWhere('company.id_company = :companyId', { companyId })
        .groupBy('user.team')
        .getRawMany();

      if (!result.length) {
        throw new HttpException(
          {
            data: null,
            message: `No teams found for boss ID ${userId} in entity ${entityId} and company ${companyId}`,
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const teams = result.map(row => row.team);

      return {
        data: teams,
        message: 'OK',
        statusCode: 200,
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

  async getTeamMembersByTeam(teamId: string, entityId: number, companyId: number) {
    try {
      const result = await this.userRepo
        .createQueryBuilder('user')
        .innerJoin('user.entity', 'entity')
        .innerJoin('entity.company', 'company')
        .where('BINARY user.team LIKE :team', { team: `%${teamId}%` })
        .andWhere('user.status = :status', { status: 1 })
        .andWhere('entity.id_entity = :entityId', { entityId })
        .andWhere('company.id_company = :companyId', { companyId })
        .getMany();

      if (!result.length) {
        throw new HttpException(
          {
            data: null,
            message: `No users found for team matching "${teamId}" in entity ${entityId} and company ${companyId}`,
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        data: result,
        message: 'OK',
        statusCode: 200,
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

  async getUserById(userId: number) {
    try {
      const result = await this.userRepo.findOne({
        where: { id_user: userId },
      });

      if (!result) {
        throw new HttpException(
          {
            data: null,
            message: `User with ID ${userId} not found`,
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        data: result,
        message: 'OK',
        statusCode: 200,
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
}
