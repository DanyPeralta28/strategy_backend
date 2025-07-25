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

  async getCustomView(
    id_company: string,
    id_entity: string,
    team: string,
    week: number,
  ) {
    try {
      const config = await this.repo.manager.findOne(FollowUpStartWeeks, {
        where: { id_company, id_entity, status: 1 },
        order: { created_at: 'DESC' },
      });

      if (!config || ![1, 2].includes(config.id_view_list)) {
        throw new HttpException(
          { data: null, message: 'Invalid configuration', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }

      const key = config.id_view_list === 1 ? 'priority_list_quality' : 'priority_list_quantity';

      const registros = await this.repo.find({
        where: { id_company, id_entity, team, status: 1 },
      });

      const result = registros
        .flatMap((registro) => (Array.isArray(registro[key]) ? registro[key] : []))
        .filter((item) => Number(item?.noWeek) === Number(week));

      if (result.length === 0) {
        throw new HttpException(
          {
            data: null,
            message: `No priorities found for week ${week}`,
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


}
