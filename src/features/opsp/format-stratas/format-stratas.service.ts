import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormatStrata } from './entities/format-strata.entity';
import { CreateFormatStrataDto } from './dto/create-format-strata.dto';
import { UpdateFormatStrataDto } from './dto/update-format-strata.dto';

@Injectable()
export class FormatStratasService {
  constructor(
    @InjectRepository(FormatStrata)
    private readonly repo: Repository<FormatStrata>,
  ) {}

  async create(dto: CreateFormatStrataDto) {
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

  async findOne(id: number, id_company: string) {
    try {
      const result = await this.repo.findOne({
        where: { id, id_company, status: 1 },
      });

      if (!result) {
        throw new HttpException(
          {
            data: null,
            message: 'Format strata not found or inactive',
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

  async findAll(id_company: string) {
    try {
      const results = await this.repo.find({
        where: { status: 1, id_company },
      });

      return {
        data: results,
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

  async update(id: number, dto: UpdateFormatStrataDto) {
    try {
      const record = await this.repo.findOne({ where: { id, status: 1 } });

      if (!record) {
        throw new HttpException(
          {
            data: null,
            message: 'Format strata not found or inactive',
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
      const record = await this.repo.findOne({ where: { id, status: 1 } });

      if (!record) {
        throw new HttpException(
          {
            data: null,
            message: 'Format strata not found or already inactive',
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.repo.update(id, { status: 0 });

      return {
        data: { id },
        message: 'Marked as inactive',
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
