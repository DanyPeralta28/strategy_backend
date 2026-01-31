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
import { FormatKpiBalancesService } from './format-kpi-balances.service';
import { CreateFormatKpiBalanceDto } from './dto/create-format-kpi-balance.dto';
import { UpdateFormatKpiBalanceDto } from './dto/update-format-kpi-balance.dto';

@ApiTags('OPSP - Format KPI Balances')
@Controller('format-kpi-balances')
export class FormatKpiBalancesController {
  constructor(private readonly service: FormatKpiBalancesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new KPI Balance' })
  @ApiResponse({
    status: 201,
    description: 'KPI Balance created',
    schema: {
      example: {
        data: { id: 1 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatKpiBalanceDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all KPI Balances by company' })
  @ApiQuery({
    name: 'id_company',
    required: true,
    type: String,
    example: '1',
    description: 'Company identifier',
  })
  @ApiQuery({
    name: 'id_entity',
    required: true,
    type: String,
    example: '1',
    description: 'Entity identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'List of balances',
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
  @ApiOperation({ summary: 'Get a KPI Balance by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Single balance record',
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
  @ApiOperation({ summary: 'Update a KPI Balance by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'KPI Balance updated',
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
    @Body() dto: UpdateFormatKpiBalanceDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a KPI Balance by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'KPI Balance deleted',
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
