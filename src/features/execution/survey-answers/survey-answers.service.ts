import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecutionSurveyAnswer } from './entities/survey-answer.entity';
import { CreateExecutionSurveyAnswerDto } from './dto/create-survey-answer.dto';

@Injectable()
export class ExecutionSurveyAnswersService {
  constructor(
    @InjectRepository(ExecutionSurveyAnswer)
    private readonly repo: Repository<ExecutionSurveyAnswer>,
  ) {}

  async create(dto: CreateExecutionSurveyAnswerDto) {
    try {
      const payload: Partial<ExecutionSurveyAnswer> = {
        id_company: dto.id_company,
        id_campaign: dto.id_campaign,
        segment_1: dto.segment_1 ?? null,
        segment_2: dto.segment_2 ?? null,
        segment_3: dto.segment_3 ?? null,
        segment_4: dto.segment_4 ?? null,
        segment_5: dto.segment_5 ?? null,
        segment_6: dto.segment_6 ?? null,
        segment_7: dto.segment_7 ?? null,
        segment_8: dto.segment_8 ?? null,
        segment_9: dto.segment_9 ?? null,
        segment_10: dto.segment_10 ?? null,
        status: 1,
      };

      const result = await this.repo.insert(payload);
      return {
        data: { id: result.identifiers[0].survey_answer_id },
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
        order: { created_at: 'DESC' },
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
          { data: null, message: 'Survey answer not found', statusCode: 404 },
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
}
