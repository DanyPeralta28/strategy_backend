import {Controller,Get,Post,Put,Delete,Param,Body,Query,ParseIntPipe,} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { FormatFlywheelService } from './format-flywheel.service';
import { CreateFormatFlywheelDto } from './dto/create-format-flywheel.dto';
import { UpdateFormatFlywheelDto } from './dto/update-format-flywheel.dto';
import { FormatFlywheel } from './entities/format-flywheel.entity';

@ApiTags('OPSP - Format Flywheel')
@Controller('format-flywheel')
export class FormatFlywheelController {
  constructor(private readonly service: FormatFlywheelService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Flywheel format record' })
  @ApiResponse({
    status: 201,
    description: 'Flywheel format created successfully',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatFlywheelDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Flywheel records for a company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: 'BANRURAL_GT',
    description: 'Company identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Flywheel records',
    schema: {
      example: {
        data: [
          {
            id: 1,
            code: 101,
            order_item: 1,
            title: 'Generar demanda sostenible',
            kpi_description: 'Incrementar leads calificados',
            kpi_leader: 'Luis Méndez',
            status: 1,
            created_by: 'admin_user',
            created_at: '2025-06-09T00:00:00.000Z',
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
  @ApiOperation({ summary: 'Get a Flywheel format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Flywheel format retrieved successfully',
    schema: {
      example: {
        data: {
          id: 1,
          code: 101,
          order_item: 1,
          title: 'Generar demanda sostenible',
          kpi_description: 'Incrementar leads calificados',
          kpi_leader: 'Luis Méndez',
          status: 1,
          created_by: 'admin_user',
          created_at: '2025-06-09T00:00:00.000Z',
          id_company: 'BANRURAL_GT',
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
  @ApiOperation({ summary: 'Update a Flywheel format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Flywheel format updated successfully',
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
    @Body() dto: UpdateFormatFlywheelDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Flywheel format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Flywheel format logically deleted',
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
