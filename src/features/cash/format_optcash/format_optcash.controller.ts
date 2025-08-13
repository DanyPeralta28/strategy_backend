// cash-format-optcash.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CashFormatOptcashService } from './format_optcash.service';
import { CreateCashFormatOptcashDto } from './dto/create-format_optcash.dto';
import { UpdateCashFormatOptcashDto } from './dto/update-format_optcash.dto';
import { CashFormatOptcash } from './entities/format_optcash.entity';

@ApiTags('CASH - Format Optcash')
@Controller('cash-format-optcash')
export class CashFormatOptcashController {
  constructor(private readonly service: CashFormatOptcashService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Optcash format record' })
  @ApiBody({
    schema: {
      example: {
        id_company: 'BANRURAL_GT',
        letter: 'A',
        idea_a_list: [{ idea: 'Expand product line', priority: 1 }],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Optcash format created successfully',
    schema: { example: { data: { id: 7 }, message: 'OK', statusCode: 201 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async create(@Body() dto: CreateCashFormatOptcashDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Optcash records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'BANRURAL_GT' })
  @ApiResponse({
    status: 200,
    description: 'Optcash formats retrieved',
    schema: {
      example: {
        data: [{
          id: 7,
          id_company: 'BANRURAL_GT',
          idea_a_list: [{ idea: 'Expand product line', priority: 1 }],
          idea_b_list: [],
          idea_c_list: [],
          idea_d_list: [],
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
  @ApiOperation({ summary: 'Get an Optcash format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 7 })
  @ApiResponse({
    status: 200,
    description: 'Optcash format found',
    schema: {
      example: {
        data: {
          id: 7,
          id_company: 'BANRURAL_GT',
          idea_a_list: [{ idea: 'Expand product line', priority: 1 }],
          idea_b_list: [],
          idea_c_list: [],
          idea_d_list: [],
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
    schema: { example: { data: null, message: 'Optcash format not found', statusCode: 404 } },
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
  @ApiOperation({ summary: 'Update an Optcash format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 7 })
  @ApiBody({
    schema: {
      example: {
        idea_a_list: [{ idea: 'Expand internationally', priority: 2 }],
        idea_b_list: [],
        idea_c_list: [],
        idea_d_list: [],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Optcash format updated successfully',
    schema: { example: { data: { id: 7 }, message: 'OK', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Optcash format not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCashFormatOptcashDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete an Optcash format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 7 })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
    schema: { example: { data: { id: 7 }, message: 'Deleted successfully', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Optcash format not found', statusCode: 404 } },
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
