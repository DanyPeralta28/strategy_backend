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
import { FormatCentralClientsService } from './format-central-clients.service';
import { CreateFormatCentralClientDto } from './dto/create-format-central-client.dto';
import { UpdateFormatCentralClientDto } from './dto/update-format-central-client.dto';

@ApiTags('OPSP - Format Central Clients')
@Controller('format-central-clients')
export class FormatCentralClientsController {
  constructor(private readonly service: FormatCentralClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Central Client record' })
  @ApiResponse({
    status: 201,
    description: 'Central Client format created',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatCentralClientDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Central Client records for a company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: 'BANRURAL_GT',
    description: 'Company identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Central Client records',
    schema: {
      example: {
        data: [
          {
            id: 1,
            id_company: 'BANRURAL_GT',
            core_client_name: 'Ana Morales',
            age_gender_education: '25 años, mujer, educación universitaria',
            status: 1,
            created_by: 'admin_user',
            created_at: '2025-06-09T00:00:00.000Z',
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
  @ApiOperation({ summary: 'Get a Central Client format by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Central Client record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Single Central Client record',
    schema: {
      example: {
        data: {
          id: 1,
          id_company: 'BANRURAL_GT',
          core_client_name: 'Ana Morales',
          success_metrics: 'Alcanzar metas personales y laborales',
          created_by: 'admin_user',
          status: 1,
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
  @ApiOperation({ summary: 'Update a Central Client format by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Central Client record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Central Client record updated successfully',
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
    @Body() dto: UpdateFormatCentralClientDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Central Client format by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Central Client record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Central Client record logically deleted',
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
