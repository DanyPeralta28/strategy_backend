// follow-up-priority-weeks.controller.ts
import {
  Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery,
} from '@nestjs/swagger';
import { FollowUpPriorityWeeksService } from './priority-weeks.service';
import { CreateFollowUpPriorityWeeksDto } from './dto/create-priority-week.dto';
import { UpdateFollowUpPriorityWeeksDto } from './dto/update-priority-week.dto';
import { FollowUpPriorityWeeks } from './entities/priority-week.entity';

@ApiTags('Follow-Up - Weekly Priorities')
@Controller('priority-weeks')
export class FollowUpPriorityWeeksController {
  constructor(private readonly service: FollowUpPriorityWeeksService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new Priority Week record' })
  @ApiResponse({
    status: 201,
    description: 'Priority Week created successfully',
    type: FollowUpPriorityWeeks,
  })
  async create(@Body() dto: CreateFollowUpPriorityWeeksDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Priority Week records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Priority Week records retrieved',
    type: [FollowUpPriorityWeeks],
  })
  async findAll(@Query('id_company') id_company: string) {
    return await this.service.findAll(id_company);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Priority Week record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Priority Week record found',
    type: FollowUpPriorityWeeks,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Priority Week record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Priority Week record updated successfully',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFollowUpPriorityWeeksDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Priority Week record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Priority Week record logically deleted',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }

  @Get('group/:id_company/:id_entity/:team/:week')
  @ApiOperation({ summary: 'Obtiene prioridades filtradas por semana y configuración de vista' })
  @ApiParam({ name: 'id_company', example: '1' })
  @ApiParam({ name: 'id_entity', example: 'SUCURSAL_001' })
  @ApiParam({ name: 'team', example: 'Tecnología' })
  @ApiParam({ name: 'week', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Lista de prioridades filtradas según vista y semana',
  })
  async getCustomView(
    @Param('id_company') id_company: string,
    @Param('id_entity') id_entity: string,
    @Param('team') team: string,
    @Param('week') week: number,
  ) {
    return await this.service.getCustomView(id_company, id_entity, team, week);
  }

  @Get('group/by-users/:id_company/:id_entity/:team/:id_users')
  @ApiOperation({ summary: 'Obtiene prioridades filtradas por semana y configuración de vista' })
  @ApiParam({ name: 'id_company', example: '1' })
  @ApiParam({ name: 'id_entity', example: 'SUCURSAL_001' })
  @ApiParam({ name: 'team', example: 'Tecnología' })
  @ApiParam({ name: 'id_users', example: '1,2,3' })
  @ApiResponse({
    status: 200,
    description: 'Lista de prioridades filtradas según vista y semana',
  })
  async getPrioritiesIds(
    @Param('id_company') id_company: string,
    @Param('id_entity') id_entity: string,
    @Param('team') team: string,
    @Param('id_users') id_users: string,
  ) {
    return await this.service.getPrioritiesIds(id_company, id_entity, team, id_users);
  }

}
