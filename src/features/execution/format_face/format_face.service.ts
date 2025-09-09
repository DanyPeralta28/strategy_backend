import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource } from 'typeorm';
import { FormatFace } from './entities/format_face.entity';
import { CreateFormatFaceDto } from './dto/create-format_face.dto';
import { UpdateFormatFaceDto } from './dto/update-format_face.dto';
import { OrgRelationsService } from '../../org-relations/org-relations.service';
import { BulkCreateFormatFaceDto } from './dto/bulk-create-format_face.dto';

@Injectable()
export class FormatFaceService {
  constructor(
    @InjectRepository(FormatFace)
    private readonly repo: Repository<FormatFace>,
    private readonly org: OrgRelationsService,
    private readonly ds: DataSource, // <-- para transacciones en bulk
  ) { }

  async createMany(dto: BulkCreateFormatFaceDto) {
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
        const insertRes = await manager
          .createQueryBuilder()
          .insert()
          .into(FormatFace)
          .values(items)
          .execute();

        const ids = insertRes.identifiers
          .map((x: any) => x.id ?? x.face_id)
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

  async findAll(id_company: string, requester_user_id: number) {
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
        where: { id_company, status: 1, created_by: In(allowedStr) },
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
          { data: null, message: 'Format Face not found', statusCode: 404 },
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

  async update(id: number, dto: UpdateFormatFaceDto) {
    try {
      const existing = await this.repo.findOne({ where: { id, status: 1 } });
      if (!existing) {
        throw new HttpException(
          { data: null, message: 'Format Face not found', statusCode: 404 },
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
          { data: null, message: 'Format Face not found', statusCode: 404 },
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
