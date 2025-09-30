import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource } from 'typeorm';
import { FormatPace } from './entities/format_pace.entity';
import { CreateFormatPaceDto } from './dto/create-format_pace.dto';
import { UpdateFormatPaceDto } from './dto/update-format_pace.dto';
import { OrgRelationsService } from '../../org-relations/org-relations.service';
import { BulkCreateFormatPaceDto } from './dto/bulk-create-format_pace.dto';

@Injectable()
export class FormatPaceService {
  constructor(
    @InjectRepository(FormatPace)
    private readonly repo: Repository<FormatPace>,
    private readonly org: OrgRelationsService,
    private readonly ds: DataSource, // <-- para transacciones (bulk)
  ) {}

  // ========= POST BULK =========
  async createMany(dto: BulkCreateFormatPaceDto) {
    try {
      const { items } = dto;

      if (!items?.length) {
        throw new HttpException(
          { data: null, message: 'No items to insert', statusCode: 400 },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (items.length > 1000) {
        throw new HttpException(
          { data: null, message: 'Too many items (max 1000)', statusCode: 400 },
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.ds.transaction(async manager => {
        const res = await manager
          .createQueryBuilder()
          .insert()
          .into(FormatPace)
          .values(items)
          .execute();

        const ids = res.identifiers
          .map((x: any) => x.id ?? x.pace_id)
          .filter(Boolean);

        return { ids, inserted: ids.length };
      });

      return { data: result, message: 'OK', statusCode: 201 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // =============================

  // (tu create original puede quedarse si lo usas en otros flujos, el controller ya no lo expone)
  async create(dto: CreateFormatPaceDto) {
    try {
      const result = await this.repo.insert(dto);
      return { data: { id: result.identifiers[0].id }, message: 'OK', statusCode: 201 };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        { data: null, message: `Internal Server Error: ${error.message}`, statusCode: 500 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ---------- visibilidad (admins ven todo; resto: jefes/compañeros/yo) ----------
  async findAll(id_company: string, requester_user_id: number, id_entity?: string) {
    try {
      const me = await this.org.getUserCore(requester_user_id);
      if (!me) {
        throw new HttpException(
          { data: null, message: 'User not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }

      if (me.level_user === 2) {
        const results = await this.repo.find({ where: { id_company, status: 1 } });
        return { data: results, message: 'OK', statusCode: 200 };
      }

      const allowedIds = await this.org.getAllowedCreatorsByUserId(requester_user_id, {
        includeSelf: true,
        sameCompanyAndEntityOnly: true,
        activeOnly: true,
      });

      const allowedStr = allowedIds.map(String); // created_by es VARCHAR
      if (!allowedStr.length) {
        return { data: [], message: 'OK', statusCode: 200 };
      }

      const results = await this.repo.find({
        where: { id_company, id_entity, status: 1, created_by: In(allowedStr) },
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
  // ------------------------------------------------------------------------------

  async findOne(id: number) {
    try {
      const result = await this.repo.findOne({ where: { id, status: 1 } });
      if (!result) {
        throw new HttpException(
          { data: null, message: 'Format Pace not found', statusCode: 404 },
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

  async update(id: number, dto: UpdateFormatPaceDto) {
    try {
      const existing = await this.repo.findOne({ where: { id, status: 1 } });
      if (!existing) {
        throw new HttpException(
          { data: null, message: 'Format Pace not found', statusCode: 404 },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.repo.update(id, dto);
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
          { data: null, message: 'Format Pace not found', statusCode: 404 },
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
