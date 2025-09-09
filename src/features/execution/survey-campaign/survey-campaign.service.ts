import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecutionSurveyCampaign } from './entities/survey-campaign.entity';
import { CreateExecutionSurveyCampaignDto } from './dto/create-survey-campaign.dto';

@Injectable()
export class ExecutionSurveyCampaignService {
  constructor(
    @InjectRepository(ExecutionSurveyCampaign)
    private readonly repo: Repository<ExecutionSurveyCampaign>,
  ) { }

  async create(dto: CreateExecutionSurveyCampaignDto) {
    try {
      const result = await this.repo.insert({
        id_company: dto.id_company,
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
        data: { id }, // si prefieres array: data: [{ id }]
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

  async findAll(id_company: string) {
    try {
      const results = await this.repo.find({
        where: { id_company, status: 1 },
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
}
