import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FormatStratasService } from './format-stratas.service';
import { CreateFormatStrataDto } from './dto/create-format-strata.dto';
import { UpdateFormatStrataDto } from './dto/update-format-strata.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('OPSP -Format Stratas')
@Controller('format-stratas')
export class FormatStratasController {
  constructor(private readonly service: FormatStratasService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new format strata record' })
  @ApiResponse({
    status: 201,
    description: 'Format strata created successfully',
    schema: {
      example: {
        data: { id: 5 },
        message: 'OK',
        statusCode: 201,
      },
    },
  })
  async create(@Body() dto: CreateFormatStrataDto) {
    return await this.service.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a format strata by ID and company' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiQuery({ name: 'id_company', type: String, example: 'Scalingsoft' })
  @ApiResponse({
    status: 200,
    description: 'Format strata found',
    schema: {
      example: {
        data: {
          id: 1,
          id_company: 'Scalingsoft',
          own_words: 'Texto...',
        },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('id_company') id_company: string,
  ) {
    return await this.service.findOne(id, id_company);
  }

  @Get()
  @ApiOperation({ summary: 'Get all format stratas by company' })
  @ApiQuery({ name: 'id_company', type: String, required: true, example: 'Scalingsoft' })
  @ApiQuery({ name: 'id_entity', type: String, required: true, example: 'Entity001' })
  @ApiResponse({
    status: 200,
    description: 'List of format stratas',
    schema: {
      example: {
        data: [
          {
            id: 1,
            id_company: 'Scalingsoft',
            own_words: 'Texto...',
          },
        ],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async findAll(@Query('id_company') id_company: string, @Query('id_entity') id_entity: string) {
    return await this.service.findAll(id_company, id_entity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing format strata by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Format strata updated successfully',
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
    @Body() dto: UpdateFormatStrataDto,
  ) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a format strata' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Format strata marked as inactive',
    schema: {
      example: {
        data: { id: 1 },
        message: 'Marked as inactive',
        statusCode: 200,
      },
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
