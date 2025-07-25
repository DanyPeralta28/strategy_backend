import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormatGoal } from './entities/format-goal.entity';
import { CreateFormatGoalDto } from './dto/create-format-goal.dto';
import { UpdateFormatGoalDto } from './dto/update-format-goal.dto';

@Injectable()
export class FormatGoalsService {
  constructor(
    @InjectRepository(FormatGoal)
    private readonly repo: Repository<FormatGoal>,
  ) {}

  /* ------------------------------------------------------------------
   * Utils
   * ------------------------------------------------------------------*/
  /**
   * Transforma el array goalData[] recibido del frontend en las
   * 6 columnas JSON que existen en la tabla.
   */
  private packGoalData(goalData: any[] = []): Partial<FormatGoal> {
    const findValues = (key: string) =>
      goalData.find((section) => section.key === key)?.values ?? null;

    return {
      three_to_five_years: findValues('threeFiveYears'),
      one_year: findValues('year'),
      trimester_one: findValues('trimesterOne'),
      trimester_two: findValues('trimesterTwo'),
      trimester_three: findValues('trimesterThree'),
      trimester_four: findValues('trimesterFour'),
    };
  }

  /* ------------------------------------------------------------------
   * CRUD
   * ------------------------------------------------------------------*/
  async create(dto: CreateFormatGoalDto) {
    try {
      // 1) Descomponer goalData → columnas JSON
      const goalPatch = this.packGoalData(dto.goal_sections);

      // 2) Quitar goal_sections del objeto y ensamblar payload
      const { goal_sections, ...rest } = dto;
      const payload = { ...rest, ...goalPatch };

      // 3) Persistir
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
          { data: null, message: 'Format Goal not found', statusCode: 404 },
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

  async update(id: number, dto: UpdateFormatGoalDto) {
    try {
      const exists = await this.repo.findOne({ where: { id, status: 1 } });
      if (!exists) {
        throw new HttpException(
          { data: null, message: 'Format Goal not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }

      const goalPatch = this.packGoalData(dto.goal_sections);

      const { goal_sections, ...rest } = dto;
      await this.repo.update(id, { ...rest, ...goalPatch });

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
      const exists = await this.repo.findOne({ where: { id, status: 1 } });
      if (!exists) {
        throw new HttpException(
          { data: null, message: 'Format Goal not found', statusCode: 404 },
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
}
