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
import { FormatBrandPromiseService } from './format-brand-promises.service';
import { CreateFormatBrandPromiseDto } from './dto/create-format-brand-promise.dto';
import { UpdateFormatBrandPromiseDto } from './dto/update-format-brand-promise.dto';

@ApiTags('OPSP - Format Brand Promises')
@Controller('format-brand-promises')
export class FormatBrandPromiseController {
  constructor(private readonly service: FormatBrandPromiseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Brand Promise record' })
  @ApiResponse({
    status: 201,
    description: 'Brand Promise created',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatBrandPromiseDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Brand Promises for a company' })
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
    example: 'SUCURSAL_001',
    description: 'Entity identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Brand Promises',
    schema: {
      example: {
        data: [
          {
            id: 1,
            id_company: 'Scalingsoft',
            core_client_description: 'Cliente que busca rapidez',
            primary_promise: 'Rapidez',
            secondary_promise: 'Transparencia',
            tertiary_promise: 'Atención personalizada',
            created_by: 'admin',
            created_at: '2025-06-09T00:00:00.000Z',
            status: 1,
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
  @ApiOperation({ summary: 'Get a Brand Promise by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Brand Promise ID' })
  @ApiResponse({
    status: 200,
    description: 'Single Brand Promise record',
    schema: {
      example: {
        data: {
          id: 1,
          id_company: 'Scalingsoft',
          core_client_description: 'Cliente que busca rapidez',
          primary_promise: 'Rapidez',
          secondary_promise: 'Transparencia',
          tertiary_promise: 'Atención personalizada',
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
  @ApiOperation({ summary: 'Update a Brand Promise by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Brand Promise ID' })
  @ApiResponse({
    status: 200,
    description: 'Brand Promise updated successfully',
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
    @Body() dto: UpdateFormatBrandPromiseDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Brand Promise by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'Brand Promise ID' })
  @ApiResponse({
    status: 200,
    description: 'Brand Promise logically deleted',
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
