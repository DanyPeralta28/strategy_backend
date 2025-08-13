// cash-format-optcash.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashFormatOptcash } from './entities/format_optcash.entity';
import { CreateCashFormatOptcashDto } from './dto/create-format_optcash.dto';
import { UpdateCashFormatOptcashDto } from './dto/update-format_optcash.dto';
import { IdeaSectionDto } from './dto/idea-section.dto';

@Injectable()
export class CashFormatOptcashService {
  constructor(
    @InjectRepository(CashFormatOptcash)
    private readonly repo: Repository<CashFormatOptcash>,
  ) {}

  /** Helpers */
  private mapSectionsToColumns(ideas: IdeaSectionDto[]) {
    const pick = (letter: 'A' | 'B' | 'C' | 'D') =>
      ideas
        .filter((s) => s.letter === letter)
        .map(({ letter, ...rest }) => rest); // almacenamos sin la letra (opcional)

    return {
      idea_a_list: pick('A'),
      idea_b_list: pick('B'),
      idea_c_list: pick('C'),
      idea_d_list: pick('D'),
    };
  }

  private composeSectionsFromColumns(row: CashFormatOptcash): IdeaSectionDto[] {
    const toSections = (letter: 'A' | 'B' | 'C' | 'D', arr: any[]) =>
      (arr ?? []).map((x) => ({ letter, ...x }));

    return [
      ...toSections('A', row.idea_a_list),
      ...toSections('B', row.idea_b_list),
      ...toSections('C', row.idea_c_list),
      ...toSections('D', row.idea_d_list),
    ];
  }

  /** CRUD */
  async create(dto: CreateCashFormatOptcashDto) {
    try {
      const mapped = this.mapSectionsToColumns(dto.ideas);
      const result = await this.repo.insert({
        id_company: dto.id_company,
        created_by: dto.created_by,
        status: dto.status,
        ...mapped,
      });
      return { data: { id: result.identifiers[0].id }, message: 'OK', statusCode: 201 };
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
      const rows = await this.repo.find({ where: { id_company, status: 1 } });
      const data = rows.map((r) => ({
        ...r,
        // opcional: exponer también en formato unificado
        ideas: this.composeSectionsFromColumns(r),
      }));
      return { data, message: 'OK', statusCode: 200 };
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
      const row = await this.repo.findOne({ where: { id, status: 1 } });
      if (!row) {
        throw new HttpException(
          { data: null, message: 'Optcash format not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }
      const data = { ...row, ideas: this.composeSectionsFromColumns(row) };
      return { data, message: 'OK', statusCode: 200 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: UpdateCashFormatOptcashDto) {
    try {
      const existing = await this.repo.findOne({ where: { id, status: 1 } });
      if (!existing) {
        throw new HttpException(
          { data: null, message: 'Optcash format not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }

      const payload: Partial<CashFormatOptcash> = {};
      if (dto.ideas?.length) Object.assign(payload, this.mapSectionsToColumns(dto.ideas));
      if (dto.status !== undefined) payload.status = dto.status;
      if (dto.created_by) payload.created_by = dto.created_by;

      await this.repo.update(id, payload);
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
      const existing = await this.repo.findOne({ where: { id, status: 1 } });
      if (!existing) {
        throw new HttpException(
          { data: null, message: 'Optcash format not found', statusCode: 404 },
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
