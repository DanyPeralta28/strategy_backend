import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormatBrandPromise } from './entities/format-brand-promise.entity';
import { CreateFormatBrandPromiseDto } from './dto/create-format-brand-promise.dto';
import { UpdateFormatBrandPromiseDto } from './dto/update-format-brand-promise.dto';

@Injectable()
export class FormatBrandPromiseService {
  constructor(
    @InjectRepository(FormatBrandPromise)
    private readonly repo: Repository<FormatBrandPromise>,
  ) {}

  async create(dto: CreateFormatBrandPromiseDto) {
    const result = await this.repo.insert(dto);
    return {
      data: { id: result.identifiers[0].id },
      message: 'OK',
      statusCode: 201,
    };
  }

  async findAll(id_company: string) {
    const results = await this.repo.find({
      where: { id_company, status: 1 },
      order: { id: 'DESC' },
    });
    return {
      data: results,
      message: 'OK',
      statusCode: 200,
    };
  }

  async findOne(id: number) {
    const result = await this.repo.findOne({ where: { id, status: 1 } });
    if (!result) {
      throw new HttpException(
        { data: null, message: 'Brand Promise not found', statusCode: 404 },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      data: result,
      message: 'OK',
      statusCode: 200,
    };
  }

  async update(id: number, dto: UpdateFormatBrandPromiseDto) {
    const existing = await this.repo.findOne({ where: { id, status: 1 } });
    if (!existing) {
      throw new HttpException(
        { data: null, message: 'Brand Promise not found', statusCode: 404 },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.repo.update(id, dto);
    return {
      data: { id },
      message: 'OK',
      statusCode: 200,
    };
  }

  async remove(id: number) {
    const existing = await this.repo.findOne({ where: { id, status: 1 } });
    if (!existing) {
      throw new HttpException(
        { data: null, message: 'Brand Promise not found', statusCode: 404 },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.repo.update(id, { status: 0 });
    return {
      data: { id },
      message: 'Deleted successfully',
      statusCode: 200,
    };
  }
}
