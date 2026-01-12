import {Controller,Get,Post,Put,Delete,Param,Body,Query,ParseIntPipe,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiQuery,} from '@nestjs/swagger';
import { FormatPurposesService } from './format-purposes.service';
import { CreateFormatPurposeDto } from './dto/create-format-purpose.dto';
import { UpdateFormatPurposeDto } from './dto/update-format-purpose.dto';

@ApiTags('OPSP - Format Purposes')
@Controller('format-purposes')
export class FormatPurposesController {
  constructor(private readonly service: FormatPurposesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Purpose record' })
  @ApiResponse({
    status: 201,
    description: 'Purpose record created',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatPurposeDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Purpose records for a company' })
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
    description: 'List of Purpose records',
    schema: {
      example: {
        data: [],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async findAll(@Query('id_company') id_company: string, @Query('id_entity') id_entity: string) {
    return this.service.findAll(id_company, id_entity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Purpose record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Single Purpose record',
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
  @ApiOperation({ summary: 'Update a Purpose record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Purpose record updated',
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
    @Body() dto: UpdateFormatPurposeDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Purpose record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Purpose record deleted',
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
  }k
}
