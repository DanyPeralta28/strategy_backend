// consistent-actions.controller.ts
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
import { ConsistentActionsService } from './consistent-actions.service';
import { CreateConsistentActionDto } from './dto/create-consistent-action.dto';
import { UpdateConsistentActionDto } from './dto/update-consistent-action.dto';
import { ConsistentAction } from './entities/consistent-action.entity';

@ApiTags('OPSP - consistent actions')
@Controller('consistent-actions')
export class ConsistentActionsController {
  constructor(private readonly service: ConsistentActionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Consistent Action' })
  @ApiResponse({
    status: 201,
    description: 'Consistent Action created successfully',
    type: ConsistentAction,
  })
  async create(@Body() dto: CreateConsistentActionDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Consistent Actions for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'Scalingsoft' })
  @ApiResponse({
    status: 200,
    description: 'Consistent Actions retrieved',
    type: [ConsistentAction],
  })
  async findAll(@Query('id_company') id_company: string) {
    return await this.service.findAll(id_company);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Consistent Action by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Consistent Action found',
    type: ConsistentAction,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Consistent Action by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Consistent Action updated successfully' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateConsistentActionDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Consistent Action by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Consistent Action logically deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
