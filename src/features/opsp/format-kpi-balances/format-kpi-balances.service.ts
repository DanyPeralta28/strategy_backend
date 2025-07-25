import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormatKpiBalance } from './entities/format-kpi-balance.entity';
import { CreateFormatKpiBalanceDto } from './dto/create-format-kpi-balance.dto';
import { UpdateFormatKpiBalanceDto } from './dto/update-format-kpi-balance.dto';

@Injectable()
export class FormatKpiBalancesService {
  constructor(
    @InjectRepository(FormatKpiBalance)
    private readonly repo: Repository<FormatKpiBalance>,
  ) {}

  /* ------------------------------------------------------------------
   * Utils
   * ------------------------------------------------------------------*/
  /**
   * Extract KPI areas from the grouped field 'kpis' into
   * individual columns matching the entity.
   */
  private packKpis(kpis: any = {}): Partial<FormatKpiBalance> {
    return {
      employee_balance: kpis?.employees ?? null,
      customer_balance: kpis?.customers ?? null,
      shareholder_balance: kpis?.shareholders ?? null,
      training_balance: kpis?.training ?? null,
      sales_marketing_balance: kpis?.sales ?? null,
      administration_balance: kpis?.administration ?? null,
    };
  }

  /* ------------------------------------------------------------------
   * CRUD
   * ------------------------------------------------------------------*/
  async create(dto: CreateFormatKpiBalanceDto) {
    try {
      const { kpis, ...rest } = dto;
      const kpiPatch = this.packKpis(kpis);
      const payload = { ...rest, ...kpiPatch };

      const result = await this.repo.insert(payload);

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
        order: { id: 'DESC' },
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

  async findOne(id: number) {
    try {
      const result = await this.repo.findOne({ where: { id, status: 1 } });
      if (!result) {
        throw new HttpException(
          {
            data: null,
            message: 'KPI Balance not found',
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

  async update(id: number, dto: UpdateFormatKpiBalanceDto) {
    try {
      const exists = await this.repo.findOne({ where: { id, status: 1 } });
      if (!exists) {
        throw new HttpException(
          {
            data: null,
            message: 'KPI Balance not found',
            statusCode: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const { kpis, ...rest } = dto;
      const kpiPatch = this.packKpis(kpis);

      await this.repo.update(id, { ...rest, ...kpiPatch });

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
            message: 'KPI Balance not found',
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
