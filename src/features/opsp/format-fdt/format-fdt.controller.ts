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
import { FormatFdtService } from './format-fdt.service';
import { CreateFormatFdtDto } from './dto/create-format-fdt.dto';
import { UpdateFormatFdtDto } from './dto/update-format-fdt.dto';
import { FormatFdt } from './entities/format-fdt.entity';

@ApiTags('OPSP -Format FDT')
@Controller('format-fdt')
export class FormatFdtController {
  constructor(private readonly service: FormatFdtService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new FDT format record' })
  @ApiResponse({ status: 201, description: 'FDT format created successfully', type: FormatFdt })
  async create(@Body() dto: CreateFormatFdtDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all FDT records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: '1' })
  @ApiQuery({ name: 'id_entity', required: false, example: '1' })
  @ApiResponse({ status: 200, description: 'FDT formats retrieved', type: [FormatFdt] })
  async findAll(@Query('id_company') id_company: string, @Query('id_entity') id_entity?: string) {
    return await this.service.findAll(id_company, id_entity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an FDT format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'FDT format found', type: FormatFdt })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an FDT format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'FDT format updated successfully' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFormatFdtDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete an FDT format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'FDT format logically deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
