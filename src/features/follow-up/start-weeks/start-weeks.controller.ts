import {Controller,Get,Post,Put,Delete,Param,Body,Query,ParseIntPipe,
} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiQuery,
} from '@nestjs/swagger';
import { FollowUpStartWeeksService } from './start-weeks.service';
import { CreateFollowUpStartWeeksDto } from './dto/create-start-week.dto';
import { UpdateFollowUpStartWeeksDto } from './dto/update-start-week.dto';
import { FollowUpStartWeeks } from './entities/start-week.entity';

@ApiTags('Follow-Up - Start Weeks')
@Controller('start-weeks')
export class FollowUpStartWeeksController {
  constructor(private readonly service: FollowUpStartWeeksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Start Week record' })
  @ApiResponse({
    status: 201,
    description: 'Start Week created successfully',
    type: FollowUpStartWeeks,
  })
  async create(@Body() dto: CreateFollowUpStartWeeksDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Start Week records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Start Week records retrieved',
    type: [FollowUpStartWeeks],
  })
  async findAll(@Query('id_company') id_company: string) {
    return await this.service.findAll(id_company);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Start Week record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Start Week record found',
    type: FollowUpStartWeeks,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Start Week record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Start Week record updated successfully' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFollowUpStartWeeksDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Start Week record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Start Week record logically deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
