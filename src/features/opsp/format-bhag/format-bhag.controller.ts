import {Controller,Get,Post,Put,Delete,Param,Body,Query,ParseIntPipe,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiQuery,} from '@nestjs/swagger';
import { FormatBhagService } from './format-bhag.service';
import { CreateFormatBhagDto } from './dto/create-format-bhag.dto';
import { UpdateFormatBhagDto } from './dto/update-format-bhag.dto';

@ApiTags('OPSP - Format BHAG')
@Controller('format-bhag')
export class FormatBhagController {
  constructor(private readonly service: FormatBhagService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new BHAG' })
  @ApiResponse({
    status: 201,
    description: 'BHAG created successfully',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatBhagDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all BHAGs by company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: 'Scalingsoft',
    description: 'Company identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of BHAGs',
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
  @ApiOperation({ summary: 'Get a BHAG by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Single BHAG found',
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
  @ApiOperation({ summary: 'Update a BHAG by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'BHAG updated',
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
    @Body() dto: UpdateFormatBhagDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a BHAG by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'BHAG marked as inactive',
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
