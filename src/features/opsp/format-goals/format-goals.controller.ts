import {Controller,Get,Post,Put,Delete,Param,Body,Query,ParseIntPipe,} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiQuery,} from '@nestjs/swagger';
import { FormatGoalsService } from './format-goals.service';
import { CreateFormatGoalDto } from './dto/create-format-goal.dto';
import { UpdateFormatGoalDto } from './dto/update-format-goal.dto';

@ApiTags('OPSP - Format Goals')
@Controller('format-goals')
export class FormatGoalsController {
  constructor(private readonly service: FormatGoalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Goals record' })
  @ApiResponse({
    status: 201,
    description: 'Goals record created',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatGoalDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Goals records for a company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: 'BANRURAL_GT',
    description: 'Company identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of Goals records',
    schema: {
      example: {
        data: [
          {
            id: 1,
            fiscal_year: '2025',
            quarter: 'Q2',
            type: 'A',
            revenue: 1200000.5,
            profit: 150000.75,
            gross_margin: 45.75,
            cash: 500000.0,
            days_receivable: 30,
            inventory_turnover_days: 60,
            revenue_per_employee: 100000.0,
            created_by: 'admin_user',
            created_at: '2025-06-09T00:00:00.000Z',
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
  @ApiOperation({ summary: 'Get a Goals record by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Goals record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Single Goals record',
    schema: {
      example: {
        data: {
          id: 1,
          fiscal_year: '2025',
          quarter: 'Q2',
          type: 'A',
          revenue: 1200000.5,
          profit: 150000.75,
          gross_margin: 45.75,
          cash: 500000.0,
          days_receivable: 30,
          inventory_turnover_days: 60,
          revenue_per_employee: 100000.0,
          created_by: 'admin_user',
          created_at: '2025-06-09T00:00:00.000Z',
          status: 1,
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
  @ApiOperation({ summary: 'Update a Goals record by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Goals record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Goals record updated successfully',
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
    @Body() dto: UpdateFormatGoalDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Goals record by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Goals record ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Goals record logically deleted',
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
