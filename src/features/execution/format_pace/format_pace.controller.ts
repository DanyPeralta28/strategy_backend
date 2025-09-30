import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { FormatPaceService } from './format_pace.service';
import { CreateFormatPaceDto } from './dto/create-format_pace.dto';
import { UpdateFormatPaceDto } from './dto/update-format_pace.dto';
import { BulkCreateFormatPaceDto } from './dto/bulk-create-format_pace.dto';

@ApiTags('EXECUTION - Format Pace')
@Controller('format-pace')
export class FormatPaceController {
  constructor(private readonly service: FormatPaceService) { }

  // ========= POST BULK (único POST) =========
  @Post()
  @ApiOperation({ summary: 'Bulk create Format Pace records (atomic)' })
  @ApiBody({
    type: BulkCreateFormatPaceDto,
    description: 'Inserta múltiples filas en una sola operación (transacción).',
  })
  @ApiResponse({
    status: 201,
    description: 'Format Pace created successfully',
    schema: { example: { data: { ids: [12, 13], inserted: 2 }, message: 'OK', statusCode: 201 } },
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
  async createMany(@Body() dto: BulkCreateFormatPaceDto) {
    return await this.service.createMany(dto);
  }
  // ==========================================

  @Get()
  @ApiOperation({ summary: 'Get visible Format Pace records for a company (bosses/admins/teammates/self)' })
  @ApiQuery({ name: 'id_company', required: true, example: 'Scalingsoft' })
  @ApiQuery({ name: 'requester_user_id', required: true, example: 13474 })
  @ApiQuery({
    name: 'id_entity',
    required: false,
    example: 'ENTITY_123',
    schema: { type: 'string', maxLength: 50, nullable: true },
    description: 'Optional entity id. Must be a string with max 50 characters.',
  })
  @ApiResponse({
    status: 200,
    description: 'Format Pace records retrieved',
    schema: {
      example: {
        data: [
          {
            id: 2,
            id_company: 'Scalingsoft',
            process_name: 'Invoice Processing',
            person_in_charge_name: 'James Smith',
            kpi_list: [{ kpi: 'Cycle Time (days)', target: 2 }],
            status: 1,
            created_by: 'admin_user',
            created_at: '02/09/2025 20:33:20',
          },
          {
            id: 3,
            id_company: 'Scalingsoft',
            process_name: 'Payment Approval',
            person_in_charge_name: 'Jane Smith',
            kpi_list: [{ kpi: 'Approval Time (hrs)', target: 24 }],
            status: 1,
            created_by: '13474',
            created_at: '06/09/2025 10:38:56',
          },
        ],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: {
      example: { data: null, message: 'requester_user_id must be numeric', statusCode: 400 },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: {
      example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 },
    },
  })
  async findAll(
    @Query('id_company') id_company: string,
    @Query('requester_user_id') requester_user_idRaw: string,
    @Query('id_entity') id_entityRaw?: string,
  ) {
    // requester_user_id obligatorio y numérico
    const uid = Number(requester_user_idRaw);
    if (!Number.isFinite(uid)) {
      throw new HttpException(
        { data: null, message: 'requester_user_id must be numeric', statusCode: 400 },
        HttpStatus.BAD_REQUEST,
      );
    }

    // id_entity opcional (string con máx 50 caracteres)
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

    return await this.service.findAll(id_company, uid, id_entity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Format Pace record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiResponse({
    status: 200,
    description: 'Format Pace found',
    schema: {
      example: {
        data: {
          id: 12,
          id_company: 'Scalingsoft',
          process_name: 'Invoice Processing',
          person_in_charge_name: 'John Doe',
          kpi_list: [{ kpi: 'Cycle Time (days)', target: 2 }],
          status: 1,
          created_by: 'admin_user',
          created_at: '2025-08-11T08:33:00.000Z',
        },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Format Pace not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Format Pace record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiBody({
    schema: {
      example: {
        process_name: 'Payment Approval',
        person_in_charge_name: 'Jane Smith',
        kpi_list: [{ kpi: 'Approval Time (hrs)', target: 24 }],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Format Pace updated successfully',
    schema: { example: { data: { id: 12 }, message: 'OK', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Format Pace not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFormatPaceDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Format Pace record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
    schema: { example: { data: { id: 12 }, message: 'Deleted successfully', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Format Pace not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
