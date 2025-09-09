import {Controller,Get,Post,Put,Delete,Param,Body,Query,ParseIntPipe,} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FormatCoreValuesService } from './format-core-values.service';
import { CreateFormatCoreValuesDto } from './dto/create-format-core-value.dto';
import { UpdateFormatCoreValuesDto } from './dto/update-format-core-value.dto';

@ApiTags('OPSP - Format Core Values')
@Controller('format-core-values')
export class FormatCoreValuesController {
  constructor(private readonly service: FormatCoreValuesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Core Value record' })
  @ApiResponse({
    status: 201,
    description: 'Core Value created',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatCoreValuesDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Core Values by company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: 'Scalingsoft',
    description: 'Company identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Core Values',
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
  @ApiOperation({ summary: 'Get a Core Value record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Core Value record found',
    schema: {
      example: {
        data: {
          id: 1,
          value_title: 'Integridad',
          short_description: 'Actuamos con ética y transparencia',
          long_description: 'Nuestra empresa fomenta la honestidad como pilar...',
          created_by: 'admin_user',
          id_company: 'Scalingsoft',
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
  @ApiOperation({ summary: 'Update a Core Value by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Core Value updated',
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
    @Body() dto: UpdateFormatCoreValuesDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Core Value record' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Core Value logically deleted',
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
