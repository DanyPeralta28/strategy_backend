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
import { FormatFactorXService } from './format-factorx.service';
import { CreateFormatFactorXDto } from './dto/create-format-factorx.dto';
import { UpdateFormatFactorXDto } from './dto/update-format-factorx.dto';
import { FormatFactorX } from './entities/format-factorx.entity';

@ApiTags('OPSP - Format Factor X')
@Controller('format-factorx')
export class FormatFactorXController {
  constructor(private readonly service: FormatFactorXService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Factor X format record' })
  @ApiResponse({
    status: 201,
    description: 'Factor X format created',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatFactorXDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Factor X records for a company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: 'Scalingsoft',
    description: 'Company identifier',
  })
  @ApiQuery({
    name: 'id_entity',
    required: true,
    type: String,
    example: 'Entity001',
    description: 'Entity identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Factor X records',
    schema: {
      example: {
        data: [
          {
            id: 1,
            id_company: 'Scalingsoft',
            process_flow_steps: [],
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
  @ApiOperation({ summary: 'Get a Factor X format by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Factor X record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Single Factor X record',
    schema: {
      example: {
        data: {
          id: 1,
          id_company: 'Scalingsoft',
          process_flow_steps: [],
          created_by: 'admin',
          created_at: '2025-06-09T00:00:00.000Z',
          status: 1,
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
  @ApiOperation({ summary: 'Update a Factor X format by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Factor X record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Factor X record updated successfully',
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
    @Body() dto: UpdateFormatFactorXDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Factor X format by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Factor X record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Factor X record logically deleted',
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
