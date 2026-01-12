import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormatFlywheel } from './entities/format-flywheel.entity';
import { CreateFormatFlywheelDto } from './dto/create-format-flywheel.dto';
import { UpdateFormatFlywheelDto } from './dto/update-format-flywheel.dto';

@Injectable()
export class FormatFlywheelService {
  constructor(
    @InjectRepository(FormatFlywheel)
    private readonly repo: Repository<FormatFlywheel>,
  ) {}

  async create(dto: CreateFormatFlywheelDto) {
    try {
      const result = await this.repo.insert(dto);
      return {
        data: { id: result.identifiers[0].id },
        message: 'OK',
        statusCode: 201,
      };
    } catch (error) {
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

  async findAll(id_company: string, id_entity: string) {
    try {
      const results = await this.repo.find({
        where: { id_company, id_entity, status: 1 },
        order: { id: 'ASC' },
      });
      return {
        data: results,
        message: 'OK',
        statusCode: 200,
      };
    } catch (error) {
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
            message: 'Format Flywheel not found',
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
      if (error instanceof HttpException) {
        throw error;
      }
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

  async update(id: number, dto: UpdateFormatFlywheelDto) {
    try {
      const exists = await this.repo.findOne({ where: { id, status: 1 } });
      if (!exists) {
        throw new HttpException(
          {
            data: null,
            message: 'Format Flywheel not found',
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.repo.update(id, dto);
      return {
        data: { id },
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

  async remove(id: number) {
    try {
      const exists = await this.repo.findOne({ where: { id, status: 1 } });
      if (!exists) {
        throw new HttpException(
          {
            data: null,
            message: 'Format Flywheel not found',
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.repo.update(id, { status: 0 });
      return {
        data: { id },
        message: 'Deleted successfully',
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
