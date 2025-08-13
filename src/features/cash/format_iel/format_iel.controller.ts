// cash-format-iel.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CashFormatIelService } from './format_iel.service';
import { CreateCashFormatIelDto } from './dto/create-format_iel.dto';
import { UpdateCashFormatIelDto } from './dto/update-format_iel.dto';
import { CashFormatIel } from './entities/format_iel.entity';


@ApiTags('CASH - Format IEL')
@Controller('cash-format-iel')
export class CashFormatIelController {
  constructor(private readonly service: CashFormatIelService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new IEL format record' })
  @ApiBody({
    schema: {
      example: {
        id_company: 'BANRURAL_GT',
        periods: [{ year: '2025', revenue: 20, cogs: 40, grossMargin: 10, directLabor: 23 }],
        impactItems: [
          { label: 'Incremento (%) de integrantes tipo “A”…', rank: 12 },
          { label: 'Fortalecer las disciplinas de Ejecución…', rank: 12 },
          { label: 'Optimizar el Desempeño del Producto…', rank: 10 },
        ],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'IEL format created successfully',
    schema: { example: { data: { id: 15 }, message: 'OK', statusCode: 201 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async create(@Body() dto: CreateCashFormatIelDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all IEL records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'BANRURAL_GT' })
  @ApiResponse({
    status: 200,
    description: 'IEL formats retrieved',
    schema: {
      example: {
        data: [{
          id: 15,
          id_company: 'BANRURAL_GT',
          periods_list: [{ year: '2025', revenue: 20, cogs: 40, grossMargin: 10, directLabor: 23 }],
          impact_items_list: [
            { label: 'Incremento (%) de integrantes tipo “A”…', rank: 12 },
            { label: 'Fortalecer las disciplinas de Ejecución…', rank: 12 },
            { label: 'Optimizar el Desempeño del Producto…', rank: 10 },
          ],
          status: 1,
          created_by: 'admin_user',
          created_at: '2025-08-11T08:33:00.000Z',
        }],
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
  async findAll(@Query('id_company') id_company: string) {
    return await this.service.findAll(id_company);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an IEL format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 15 })
  @ApiResponse({
    status: 200,
    description: 'IEL format found',
    schema: {
      example: {
        data: {
          id: 15,
          id_company: 'BANRURAL_GT',
          periods_list: [{ year: '2025', revenue: 20, cogs: 40, grossMargin: 10, directLabor: 23 }],
          impact_items_list: [{ label: 'Optimizar el Desempeño…', rank: 10 }],
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
    schema: { example: { data: null, message: 'IEL format not found', statusCode: 404 } },
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
  @ApiOperation({ summary: 'Update an IEL format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 15 })
  @ApiBody({
    schema: {
      example: {
        periods: [{ year: '2026', revenue: 30, cogs: 35, grossMargin: 12, directLabor: 22 }],
        impactItems: [{ label: 'Nueva prioridad', rank: 9 }],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'IEL format updated successfully',
    schema: { example: { data: { id: 15 }, message: 'OK', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'IEL format not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCashFormatIelDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete an IEL format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 15 })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
    schema: { example: { data: { id: 15 }, message: 'Deleted successfully', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'IEL format not found', statusCode: 404 } },
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

