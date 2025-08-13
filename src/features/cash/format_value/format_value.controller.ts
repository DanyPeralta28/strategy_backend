// cash-format-value.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CashFormatValueService } from './format_value.service';
import { CreateCashFormatValueDto } from './dto/create-format_value.dto';
import { UpdateCashFormatValueDto } from './dto/update-format_value.dto';

@ApiTags('CASH - Format Value')
@Controller('cash-format-value')
export class CashFormatValueController {
  constructor(private readonly service: CashFormatValueService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Value format record' })
  @ApiBody({
    schema: {
      example: {
        id_company: 'BANRURAL_GT',
        area_list: [{ area: 'Finance', score: 95 }],
        priority_list: [{ priority: 'High', weight: 0.5 }],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Value format created successfully',
    schema: { example: { data: { id: 12 }, message: 'OK', statusCode: 201 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async create(@Body() dto: CreateCashFormatValueDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Value records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'BANRURAL_GT' })
  @ApiResponse({
    status: 200,
    description: 'Value formats retrieved',
    schema: {
      example: {
        data: [{
          id: 12,
          id_company: 'BANRURAL_GT',
          area_list: [{ area: 'Finance', score: 95 }],
          priority_list: [{ priority: 'High', weight: 0.5 }],
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
  @ApiOperation({ summary: 'Get a Value format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiResponse({
    status: 200,
    description: 'Value format found',
    schema: {
      example: {
        data: {
          id: 12,
          id_company: 'BANRURAL_GT',
          area_list: [{ area: 'Finance', score: 95 }],
          priority_list: [{ priority: 'High', weight: 0.5 }],
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
    schema: { example: { data: null, message: 'Value format not found', statusCode: 404 } },
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
  @ApiOperation({ summary: 'Update a Value format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiBody({
    schema: {
      example: {
        area_list: [{ area: 'Sales', score: 88 }],
        priority_list: [{ priority: 'Medium', weight: 0.3 }],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Value format updated successfully',
    schema: { example: { data: { id: 12 }, message: 'OK', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Value format not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCashFormatValueDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Value format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
    schema: { example: { data: { id: 12 }, message: 'Deleted successfully', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Value format not found', statusCode: 404 } },
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
