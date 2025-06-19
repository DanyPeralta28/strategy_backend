import {Controller,Get,Post,Body,Param,Put,Delete,ParseIntPipe,Query,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiQuery,} from '@nestjs/swagger';
import { FormatVisionsService } from './format-visions.service';
import { CreateFormatVisionDto } from './dto/create-format-vision.dto';
import { UpdateFormatVisionDto } from './dto/update-format-vision.dto';

@ApiTags('OPSP - Format Visions')
@Controller('format-visions')
export class FormatVisionsController {
  constructor(private readonly service: FormatVisionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new format vision record' })
  @ApiResponse({
    status: 201,
    description: 'Format vision created successfully',
    schema: {
      example: {
        data: { id: 4 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatVisionDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active format visions by company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: 'BANRURAL_GT',
    description: 'Company identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'All format visions retrieved',
    schema: {
      example: {
        data: [
          {
            id: 1,
            core_values: 'Integrity, Innovation',
            purpose: 'Empower through strategy',
            brand_promises: 'Delivering exceptional value',
            created_by: 'admin_user',
            created_at: '2025-06-05T00:00:00.000Z',
            status: 1,
            id_company: 'BANRURAL_GT',
          },
        ],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async findAll(@Query('id_company') id_company: string) {
    return this.service.findAll(id_company);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a format vision by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Format vision found',
    schema: {
      example: {
        data: {
          id: 1,
          core_values: 'Integrity, Innovation',
          purpose: 'Empower through strategy',
          brand_promises: 'Delivering exceptional value',
          status: 1,
          created_by: 'admin_user',
          created_at: '2025-06-05T00:00:00.000Z',
          id_company: 'BANRURAL_GT',
        },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Format vision not found or inactive',
    schema: {
      example: {
        data: null,
        message: 'Format vision not found or inactive',
        statusCode: 404,
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a format vision by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Format vision updated successfully',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Format vision not found or inactive',
    schema: {
      example: {
        data: null,
        message: 'Format vision not found or inactive',
        statusCode: 404,
      },
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFormatVisionDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a format vision by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Format vision marked as inactive',
    schema: {
      example: {
        data: { id: 1 },
        message: 'Deleted successfully',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Format vision not found or already inactive',
    schema: {
      example: {
        data: null,
        message: 'Format vision not found or already inactive',
        statusCode: 404,
      },
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
