import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { FormatVision } from './entities/format-vision.entity';
import { CreateFormatVisionDto } from './dto/create-format-vision.dto';
import { UpdateFormatVisionDto } from './dto/update-format-vision.dto';

@Injectable()
export class FormatVisionsService {
  constructor(
    @InjectRepository(FormatVision)
    private readonly repo: Repository<FormatVision>,
  ) {}

  /* ------------------------------------------------------------------
   * Utils
   * ------------------------------------------------------------------*/
  /**
   * Convierte el arreglo visionData[] en las tres columnas JSON
   *  - strategic_priorities_1_year
   *  - strategic_priorities_3_to_5_years
   *  - strategic_priorities_trimester
   */
  private packVisionDataArray(
    visionData: { key: string; values: any[] }[] = [],
  ): Pick<
    FormatVision,
    | 'strategic_priorities_1_year'
    | 'strategic_priorities_3_to_5_years'
    | 'strategic_priorities_trimester'
  > {
    const find = (k: string) => visionData.find((s) => s.key === k)?.values ?? null;

    return {
      strategic_priorities_1_year: find('year'),
      strategic_priorities_3_to_5_years: find('threeFiveYears'),
      strategic_priorities_trimester: {
        trimesterOne:   find('trimesterOne'),
        trimesterTwo:   find('trimesterTwo'),
        trimesterThree: find('trimesterThree'),
        trimesterFour:  find('trimesterFour'),
      },
    };
  }

  /* ------------------------------------------------------------------
   * CRUD
   * ------------------------------------------------------------------*/
  async create(dto: CreateFormatVisionDto) {
    try {
      // 1. Generar bloque JSON para la entidad
      const visionPatch = this.packVisionDataArray(dto.visionData);

      // 2. Excluir visionData (la entidad no lo tiene como columna)
      //    y ensamblar el objeto a persistir
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { visionData, ...rest } = dto;
      const entity: DeepPartial<FormatVision> = {
        ...rest,
        ...visionPatch,
      };

      // 3. Guardar
      const saved = await this.repo.save(entity);

      return { data: { id: saved.id }, message: 'OK', statusCode: 201 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
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
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.repo.findOne({ where: { id, status: 1 } });

      if (!result) {
        throw new HttpException(
          { data: null, message: 'Format vision not found or inactive', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }

      return { data: result, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateFormatVisionDto) {
    try {
      const exists = await this.repo.findOne({ where: { id, status: 1 } });
      if (!exists) {
        throw new HttpException(
          { data: null, message: 'Format vision not found or inactive', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }

      const visionPatch = this.packVisionDataArray(dto.visionData);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { visionData, ...rest } = dto;
      await this.repo.update(id, { ...rest, ...visionPatch });

      return { data: { id }, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const exists = await this.repo.findOne({ where: { id, status: 1 } });
      if (!exists) {
        throw new HttpException(
          { data: null, message: 'Format vision not found or already inactive', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.repo.update(id, { status: 0 });
      return { data: { id }, message: 'Deleted successfully', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
