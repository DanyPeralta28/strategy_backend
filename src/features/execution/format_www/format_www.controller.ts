import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { FormatWwwService } from './format_www.service';
import { CreateFormatWwwDto } from './dto/create-format_www.dto';
import { UpdateFormatWwwDto } from './dto/update-format_www.dto';
import { BulkCreateFormatWwwDto } from './dto/bulk-create-format_www.dto';

@ApiTags('EXECUTION - Format WWW')
@Controller('format-www')
export class FormatWwwController {
  constructor(private readonly service: FormatWwwService) { }


  @Post()
  @ApiOperation({ summary: 'Bulk create Format WWW records ' })
  @ApiBody({
    type: BulkCreateFormatWwwDto,
    description: 'Inserta múltiples filas en un solo guardado (transacción).',
  })
  @ApiResponse({
    status: 201,
    description: 'Created',
    schema: { example: { data: { ids: [7, 8], inserted: 2 }, message: 'OK', statusCode: 201 } },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: { example: { data: null, message: 'No items to insert', statusCode: 400 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async createMany(@Body() dto: BulkCreateFormatWwwDto) {
    return await this.service.createMany(dto);
  }



  @Get()
  @ApiOperation({ summary: 'Get all Format WWW records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: '1' })
  @ApiQuery({
    name: 'id_entity',
    required: false,
    example: 'ENTITY_123',
    schema: { type: 'string', maxLength: 50, nullable: true },
    description: 'Optional entity id. Must be a string with max 50 characters.',
  })
  @ApiResponse({
    status: 200,
    description: 'Records',
    schema: {
      example: {
        data: [
          {
            id: 2,
            id_company: '1',
            what: 'Entregar el plan de marketing',
            who: 'Julio An leu',
            when: '2025-01-28',
            www_status: 'Atrasado',
            new_when: '2025-03-30',
            created_by: '13474',
            status: 1,
            created_at: '2025-09-02T20:33:20.000Z',
          },
        ],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async findAll(
    @Query('id_company') id_company: string,
    @Query('id_entity') id_entityRaw?: string,
  ) {
    let id_entity: string | undefined = undefined;
    if (
      id_entityRaw &&
      id_entityRaw !== '{id_entity}' &&
      id_entityRaw.toLowerCase() !== 'undefined' &&
      id_entityRaw.toLowerCase() !== 'null'
    ) {
      if (typeof id_entityRaw !== 'string') {
        throw new BadRequestException({
          data: null,
          message: 'id_entity must be a string conforming to the specified constraints',
          statusCode: 400,
        });
      }
      if (id_entityRaw.length > 50) {
        throw new BadRequestException({
          data: null,
          message: 'id_entity must not exceed 50 characters',
          statusCode: 400,
        });
      }
      id_entity = id_entityRaw;
    }

    return await this.service.findAll(id_company, id_entity);
  }


  @Get('visible')
  @ApiOperation({ summary: 'Get visible WWW (meeting o inicial)' })
  @ApiQuery({ name: 'id_company', required: true, example: '1' })
  @ApiQuery({ name: 'requester_user_id', required: true, example: 13474 })
  @ApiQuery({
    name: 'preset',
    required: false,
    example: 'meeting',
    description: 'meeting = todo excepto Ejecutado, desde hoy hacia atrás; sin preset = inicial',
  })
  @ApiQuery({
    name: 'statuses',
    required: false,
    example: 'Pendiente,En proceso',
    description: 'Filtrar por estados (separados por coma)(Atrasado,En proceso, Ejecutado)',
  })
  @ApiQuery({
    name: 'team_scope',
    required: false,
    example: 'my',
    description: "'my' (por defecto) = mi equipo; 'led' = equipo que lidero (subordinados)",
  })
  @ApiQuery({
    name: 'id_entity',
    required: false,
    example: 'ENTITY_123',
    schema: { type: 'string', maxLength: 50, nullable: true },
    description: 'Optional entity id. Must be a string with max 50 characters.',
  })
  @ApiResponse({
    status: 200,
    description: 'Registros visibles según preset',
    schema: {
      example: {
        data: [
          {
            id: 3,
            id_company: '1',
            what: 'Entregar el plan de marketing',
            who: 'Julio An leu',
            when: '2025-01-28',
            www_status: 'Pendiente',
            new_when: '2025-03-30',
            created_by: '13474',
            status: 1,
            created_at: '2025-09-06T10:38:56.000Z',
          },
        ],
        meta: { total: 12 },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async findAllVisible(
    @Query('id_company') id_company: string,
    @Query('requester_user_id') requester_user_id: string,
    @Query('preset') preset?: 'meeting',
    @Query('statuses') statuses?: string,
    @Query('team_scope') team_scope?: 'my' | 'led',
    @Query('id_entity') id_entityRaw?: string,
  ) {
    const uid = Number(requester_user_id);
    if (!Number.isFinite(uid)) {
      throw new HttpException(
        { data: null, message: 'requester_user_id must be numeric', statusCode: 400 },
        HttpStatus.BAD_REQUEST,
      );
    }

    let id_entity: string | undefined = undefined;
    if (
      id_entityRaw &&
      id_entityRaw !== '{id_entity}' &&
      id_entityRaw.toLowerCase() !== 'undefined' &&
      id_entityRaw.toLowerCase() !== 'null'
    ) {
      if (typeof id_entityRaw !== 'string') {
        throw new BadRequestException({
          data: null,
          message: 'id_entity must be a string conforming to the specified constraints',
          statusCode: 400,
        });
      }
      if (id_entityRaw.length > 50) {
        throw new BadRequestException({
          data: null,
          message: 'id_entity must not exceed 50 characters',
          statusCode: 400,
        });
      }
      id_entity = id_entityRaw;
    }

    return this.service.findAllVisibleWithFilters({
      id_company,
      requester_user_id: uid,
      preset,
      statuses,
      team_scope,
      id_entity,
    } as any);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a Format WWW record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiResponse({
    status: 200,
    description: 'Found',
    schema: {
      example: {
        data: {
          id: 12,
          id_company: '1',
          what: 'Entregar el plan de marketing',
          who: 'Julio An leu',
          when: '2025-01-28',
          www_status: 'Atrasado',
          new_when: '2025-03-30',
          created_by: '13474',
          status: 1,
          created_at: '2025-08-11T08:33:00.000Z',
        },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Not found', schema: { example: { data: null, message: 'Format WWW not found', statusCode: 404 } } })
  @ApiResponse({ status: 500, description: 'Internal error', schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } } })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Format WWW record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiBody({
    schema: {
      example: {
        what: 'Ajustar metas Q4',
        who: 'Carlos Pérez',
        when: '2025-10-01',
        www_status: 'Pendiente',
        new_when: '2025-10-05',
        status: 1,
        created_by: '13474',
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Updated', schema: { example: { data: { id: 12 }, message: 'OK', statusCode: 200 } } })
  @ApiResponse({ status: 404, description: 'Not found', schema: { example: { data: null, message: 'Format WWW not found', statusCode: 404 } } })
  @ApiResponse({ status: 500, description: 'Internal error', schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } } })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFormatWwwDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Format WWW record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiResponse({ status: 200, description: 'Deleted', schema: { example: { data: { id: 12 }, message: 'Deleted successfully', statusCode: 200 } } })
  @ApiResponse({ status: 404, description: 'Not found', schema: { example: { data: null, message: 'Format WWW not found', statusCode: 404 } } })
  @ApiResponse({ status: 500, description: 'Internal error', schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } } })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
