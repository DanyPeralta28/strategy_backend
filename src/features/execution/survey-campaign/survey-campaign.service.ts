import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Raw } from 'typeorm';
import { ExecutionSurveyCampaign } from './entities/survey-campaign.entity';
import { CreateExecutionSurveyCampaignDto } from './dto/create-survey-campaign.dto';
import { OrgRelationsService } from '../../org-relations/org-relations.service';
import { UpdateExecutionSurveyCampaignDto } from './dto/update-survey-campaign.dto';

@Injectable()
export class ExecutionSurveyCampaignService {
  constructor(
    @InjectRepository(ExecutionSurveyCampaign)
    private readonly repo: Repository<ExecutionSurveyCampaign>,
    private readonly org: OrgRelationsService,
  ) { }

  async create(dto: CreateExecutionSurveyCampaignDto) {
    try {
      const result = await this.repo.insert({
        id_company: dto.id_company,
        campaign_name: dto.campaign_name ?? null,
        id_entity: dto.id_entity ?? null,
        created_by: dto.created_by ?? undefined,
        status: 1,
      });

      const id = result.identifiers?.[0]?.id ?? result.raw?.insertId;

      if (!id) {
        throw new HttpException(
          { data: {}, message: 'Could not retrieve insert id', statusCode: 500 },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        data: { id },
        message: 'OK',
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: {}, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    id_company: string,
    id_entity: string,
    id_user: string,
    created_at: string, // 'YYYY-MM-DD'
  ) {
    try {
      const idUserNum = Number(id_user);
      if (!Number.isFinite(idUserNum)) {
        throw new BadRequestException({
          data: null,
          message: 'id_user must be a valid numeric string',
          statusCode: 400,
        });
      }
      const me = await this.org.getUserCore(idUserNum);
      if (!me) {
        throw new HttpException(
          { data: null, message: 'User not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }

      const dateFilter = Raw(alias => `DATE(${alias}) = :d`, { d: created_at });

      if (me.level_user === 2 && me.status === 1 && me.has_noBoss === 1) {
        const results = await this.repo.find({
          where: {
            id_company,
            id_entity,
            status: 1,
            created_at: dateFilter,
          },
          order: { created_at: 'DESC' },
        });
        return { data: results, message: 'OK', statusCode: 200 };
      }

      const results = await this.repo.find({
        where: {
          id_company,
          id_entity,
          created_by: id_user,
          status: 1,
          created_at: dateFilter,
        },
        order: { created_at: 'DESC' },
      });

      return { data: results, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: {}, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.repo.findOne({ where: { id, status: 1 } });
      if (!result) {
        throw new HttpException(
          { data: {}, message: 'Survey campaign not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }
      return { data: result, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: {}, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStatus(id: number, dto: UpdateExecutionSurveyCampaignDto) {
    try {
      const existing = await this.repo.findOne({ where: { id, status: 1 } as any });
      if (!existing) {
        throw new HttpException(
          { data: null, message: 'Campaign not found or inactive', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.repo.update(id, dto);
      return { data: { id }, message: 'Successfully updated status', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // NUEVO MÉTODO
  async hasActiveByCreator(
    id_company: string,
    user_id: string,          // corresponde a created_by (varchar 100)
    id_entity?: string,
  ) {
    try {
      const where: any = {
        id_company,
        created_by: user_id,
        status: 1,
      };
      if (id_entity) where.id_entity = id_entity;

      const campaign = await this.repo.findOne({
        where,
        order: { created_at: 'DESC' },
      });

      return {
        data: {
          hasActive: Boolean(campaign),
          campaign: campaign ?? null,
        },
        message: 'OK',
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
