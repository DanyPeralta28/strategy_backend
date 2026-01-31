import {Controller,Get,Post,Put,Delete,Param,Body,Query,ParseIntPipe,
} from '@nestjs/common';
import {ApiTags,ApiOperation,ApiResponse,ApiParam,ApiQuery,
} from '@nestjs/swagger';
import { WinGameService } from './win-game.service';
import { CreateWinGameDto } from './dto/create-win-game.dto';
import { UpdateWinGameDto } from './dto/update-win-game.dto';
import { WinGameDashboard } from './entities/win-game.entity';

@ApiTags('OPSP - Win The Game')
@Controller('win-game')
export class WinGameController {
  constructor(private readonly service: WinGameService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Win Game record' })
  @ApiResponse({
    status: 201,
    description: 'Win Game record created successfully',
    type: WinGameDashboard,
  })
  async create(@Body() dto: CreateWinGameDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Win Game records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: '1' })
  @ApiQuery({ name: 'id_entity', required: false, example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Win Game records retrieved',
    type: [WinGameDashboard],
  })
  async findAll(@Query('id_company') id_company: string, @Query('id_entity') id_entity: string) {
    return await this.service.findAll(id_company, id_entity);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Win Game record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Win Game record found',
    type: WinGameDashboard,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Win Game record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Win Game record updated successfully' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateWinGameDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Win Game record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Win Game record logically deleted' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
