import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FormatProfitPerXService } from './format-profit-perx.service';
import { CreateFormatProfitPerXDto } from './dto/create-format-profit-perx.dto';
import { UpdateFormatProfitPerXDto } from './dto/update-format-profit-perx.dto';

@ApiTags('OPSP - Format Profit Per X')
@Controller('format-profit-perx')
export class FormatProfitPerXController {
  constructor(private readonly service: FormatProfitPerXService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Profit Per X record' })
  @ApiResponse({
    status: 201,
    description: 'Profit Per X created',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatProfitPerXDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Profit Per X records for a company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: '1',
    description: 'Company identifier',
  })
  @ApiQuery({
    name: 'id_entity',
    required: true,
    type: String,
    example: '1',
    description: 'Entity identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Profit Per X records',
    schema: {
      example: {
        data: [
          {
            id: 1,
            id_company: '1',
            profit_per_x_definition: 'Ganancia por cliente',
            status: 1,
            created_by: 'admin',
            created_at: '2025-06-09T00:00:00.000Z',
          },
        ],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async findAll(@Query('id_company') id_company: string, @Query('id_entity') id_entity: string) {
    return this.service.findAll(id_company, id_entity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Profit Per X record by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Profit Per X record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Single Profit Per X record',
    schema: {
      example: {
        data: {
          id: 1,
          id_company: '1',
          profit_per_x_definition: 'Ganancia por cliente',
          status: 1,
          created_by: 'admin',
          created_at: '2025-06-09T00:00:00.000Z',
        },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Profit Per X record by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Profit Per X record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Profit Per X record updated successfully',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFormatProfitPerXDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Profit Per X record by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Profit Per X record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Profit Per X record logically deleted',
    schema: {
      example: {
        data: { id: 1 },
        message: 'Deleted successfully',
        statusCode: 200,
      },
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
