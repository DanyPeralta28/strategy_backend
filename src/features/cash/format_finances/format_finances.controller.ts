// cash-format-finances.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CashFormatFinancesService } from './format_finances.service';
import { CreateCashFormatFinancesDto } from './dto/create-format_finance.dto';
import { UpdateCashFormatFinancesDto } from './dto/update-format_finance.dto';
import { CashFormatFinances } from './entities/format_finance.entity';

@ApiTags('CASH - Format Finances')
@Controller('cash-format-finances')
export class CashFormatFinancesController {
  constructor(private readonly service: CashFormatFinancesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Finances format record' })
  @ApiBody({
    schema: {
      example: {
        id_company: 'BANRURAL_GT',
        evaluations_list: [{ store_id: 1, score: 85 }],
        attributes_list: [{ attr: 'ROI', value: 0.23 }],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Finances format created successfully',
    schema: { example: { data: { id: 11 }, message: 'OK', statusCode: 201 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async create(@Body() dto: CreateCashFormatFinancesDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Finances records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'BANRURAL_GT' })
  @ApiResponse({
    status: 200,
    description: 'Finances formats retrieved',
    schema: {
      example: {
        data: [{
          id: 11,
          id_company: 'BANRURAL_GT',
          evaluations_list: [{ store_id: 1, score: 85 }],
          attributes_list: [{ attr: 'ROI', value: 0.23 }],
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
  @ApiOperation({ summary: 'Get a Finances format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 11 })
  @ApiResponse({
    status: 200,
    description: 'Finances format found',
    schema: {
      example: {
        data: {
          id: 11,
          id_company: 'BANRURAL_GT',
          evaluations_list: [{ store_id: 1, score: 85 }],
          attributes_list: [{ attr: 'ROI', value: 0.23 }],
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
    schema: { example: { data: null, message: 'Finances format not found', statusCode: 404 } },
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
  @ApiOperation({ summary: 'Update a Finances format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 11 })
  @ApiBody({
    schema: {
      example: {
        evaluations_list: [{ store_id: 2, score: 90 }],
        attributes_list: [{ attr: 'CAC', value: 120 }],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Finances format updated successfully',
    schema: { example: { data: { id: 11 }, message: 'OK', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Finances format not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCashFormatFinancesDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Finances format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 11 })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
    schema: { example: { data: { id: 11 }, message: 'Deleted successfully', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Finances format not found', statusCode: 404 } },
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
