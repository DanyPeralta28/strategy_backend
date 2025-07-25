import {Controller,Get,Post,Put,Delete,Param,Body,Query,ParseIntPipe,
} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiQuery,
} from '@nestjs/swagger';
import { GroupControlService } from './group-control.service';
import { CreateGroupControlDto } from './dto/create-group-control.dto';
import { UpdateGroupControlDto } from './dto/update-group-control.dto';
import { GroupControl } from './entities/group-control.entity';

@ApiTags('Follow-Up - Group Control')
@Controller('group-control')
export class GroupControlController {
  constructor(private readonly service: GroupControlService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new Group Control record' })
  @ApiResponse({
    status: 201,
    description: 'Group Control created successfully',
    type: GroupControl,
  })
  async create(@Body() dto: CreateGroupControlDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Group Control records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'BANRURAL_GT' })
  @ApiResponse({
    status: 200,
    description: 'Group Control records retrieved',
    type: [GroupControl],
  })
  async findAll(@Query('id_company') id_company: string) {
    return await this.service.findAll(id_company);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Group Control record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Group Control record found',
    type: GroupControl,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Group Control record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Group Control record updated successfully' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGroupControlDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Group Control record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Group Control record logically deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
