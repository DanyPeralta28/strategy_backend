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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { FormatCompetenciesService } from './format-competencies.service';
import { CreateFormatCompetencyDto } from './dto/create-format-competency.dto';
import { UpdateFormatCompetencyDto } from './dto/update-format-competency.dto';

@ApiTags('OPSP - Format Competencies')
@Controller('format-competencies')
export class FormatCompetenciesController {
  constructor(private readonly service: FormatCompetenciesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Competency record' })
  @ApiResponse({
    status: 201,
    description: 'Competency created',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatCompetencyDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Competencies by company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: 'Scalingsoft',
    description: 'Company identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of competencies',
    schema: {
      example: {
        data: [],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async findAll(@Query('id_company') id_company: string) {
    return this.service.findAll(id_company);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Competency by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Single Competency',
    schema: {
      example: {
        data: {},
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Competency by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Competency updated',
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
    @Body() dto: UpdateFormatCompetencyDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Competency by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Competency deleted',
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
