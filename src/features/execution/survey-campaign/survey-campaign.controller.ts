// src/modules/execution/survey-campaign/survey-campaign.controller.ts
import { Controller, Get, Post, Param, Body, Query, ParseIntPipe, BadRequestException, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { ExecutionSurveyCampaignService } from './survey-campaign.service';
import { CreateExecutionSurveyCampaignDto } from './dto/create-survey-campaign.dto';
import { UpdateExecutionSurveyCampaignDto } from './dto/update-survey-campaign.dto';

@ApiTags('Execution - Survey Campaign')
@Controller('execution/survey-campaign')
export class ExecutionSurveyCampaignController {
  constructor(private readonly service: ExecutionSurveyCampaignService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new survey campaign and return its id' })
  @ApiBody({
    type: CreateExecutionSurveyCampaignDto,
    examples: {
      sample: {
        summary: 'Basic payload',
        value: { campaign_name: 'GRUPO DE LAS 10 AM', id_company: 'Scalling', created_by: '1', id_entity: 'SUCURSAL_001' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Survey campaign created successfully',
    content: {
      'application/json': {
        examples: {
          success: { value: { data: { id: 101 }, message: 'OK', statusCode: 201 } },
          error: {
            summary: 'Validation error',
            value: { data: {}, message: 'Internal Server Error: id_company must be a string', statusCode: 500 },
          },
        },
      },
    },
  })
  async create(@Body() dto: CreateExecutionSurveyCampaignDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all survey campaigns for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'Scalling' })
  @ApiQuery({ name: 'id_entity', required: true, example: 'SUCURSAL_001' })
  @ApiQuery({ name: 'id_user', required: true, example: '13945' })
  @ApiQuery({ name: 'created_at', required: true, example: '2025-09-22' })
  @ApiResponse({
    status: 200,
    description: 'Survey campaigns retrieved',
    content: {
      'application/json': {
        examples: {
          success: {
            value: {
              data: [
                {
                  id: 101,
                  created_by: 'admin@scalling.com',
                  status: 1,
                  created_at: '2025-09-09',
                  id_company: 'Scalling',
                },
              ],
              message: 'OK',
              statusCode: 200,
            },
          },
        },
      },
    },
  })
  async findAll(
    @Query('id_company') id_company: string,
    @Query('id_entity') id_entityRaw?: string,
    @Query('id_user') id_user?: string,
    @Query('created_at') created_at?: string,
  ) {
    let id_entity: string | undefined = undefined;

    if (
      id_entityRaw &&
      id_entityRaw !== '{id_entity}' &&
      id_entityRaw.toLowerCase() !== 'undefined' &&
      id_entityRaw.toLowerCase() !== 'null'
    ) {
      if (typeof id_entityRaw !== 'string') {
        throw new BadRequestException({
          data: null,
          message: 'id_entity must be a string conforming to the specified constraints',
          statusCode: 400,
        });
      }

      if (id_entityRaw.length > 50) {
        throw new BadRequestException({
          data: null,
          message: 'id_entity must not exceed 50 characters',
          statusCode: 400,
        });
      }

      id_entity = id_entityRaw;
    }

    if (
      created_at &&
      created_at.toLowerCase() !== 'undefined' &&
      created_at.toLowerCase() !== 'null'
    ) {
      if (typeof created_at !== 'string') {
        throw new BadRequestException({
          data: null,
          message: 'created_at must be a string',
          statusCode: 400,
        });
      }

      const isIsoDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(created_at);
      const dateToTest = isIsoDateOnly ? `${created_at}T00:00:00Z` : created_at;

      const time = Date.parse(dateToTest);
      if (Number.isNaN(time)) {
        throw new BadRequestException({
          data: null,
          message: 'created_at must be a valid ISO 8601 date (e.g. YYYY-MM-DD or full ISO datetime)',
          statusCode: 400,
        });
      }
    }

    return await this.service.findAll(id_company, id_entity as any, id_user as any, created_at as any);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a survey campaign by ID' })
  @ApiParam({ name: 'id', type: Number, example: 101 })
  @ApiResponse({
    status: 200,
    description: 'Survey campaign found',
    content: {
      'application/json': {
        examples: {
          success: {
            value: {
              data: {
                id: 101,
                created_by: 'admin@scalling.com',
                status: 1,
                created_at: '2025-09-09T12:34:56.000Z',
                id_company: 'Scalling',
              },
              message: 'OK',
              statusCode: 200,
            },
          },
          notFound: { value: { data: {}, message: 'Survey campaign not found', statusCode: 404 } },
        },
      },
    },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the campaign status' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiBody({
    schema: {
      example: {
        status: 2,
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Updated', schema: { example: { data: { id: 12 }, message: 'OK', statusCode: 200 } } })
  @ApiResponse({ status: 404, description: 'Not found', schema: { example: { data: null, message: 'campaign not found', statusCode: 404 } } })
  @ApiResponse({ status: 500, description: 'Internal error', schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } } })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateExecutionSurveyCampaignDto) {
    return await this.service.updateStatus(id, dto);
  }

  @Get('active/by-user')
  @ApiOperation({ summary: 'Verifica si un usuario tiene una campaña activa' })
  @ApiQuery({ name: 'id_company', required: true, example: 'Scalling' })
  @ApiQuery({ name: 'user_id', required: true, example: 'admin@scalling.com' })
  @ApiQuery({ name: 'id_entity', required: false, example: 'SUCURSAL_001' })
  @ApiResponse({
    status: 200,
    description: 'Resultado de la verificación',
    schema: {
      example: {
        data: {
          hasActive: true,
          campaign: {
            id: 123,
            campaign_name: 'GRUPO DE LAS 10 AM',
            created_by: 'admin@scalling.com',
            status: 1,
            created_at: '2025-09-22T10:00:00.000Z',
            id_company: 'Scalling',
            id_entity: 'SUCURSAL_001',
          },
        },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  async hasActiveByUser(
    @Query('id_company') id_company: string,
    @Query('user_id') user_id: string,
    @Query('id_entity') id_entity?: string,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException({
        data: null,
        message: 'user_id must be a non-empty string',
        statusCode: 400,
      });
    }
    const trimmed = user_id.trim();
    if (trimmed.length === 0 || trimmed.length > 100) {
      throw new BadRequestException({
        data: null,
        message: 'user_id length must be between 1 and 100 characters',
        statusCode: 400,
      });
    }
    if (id_entity && id_entity.length > 50) {
      throw new BadRequestException({
        data: null,
        message: 'id_entity must not exceed 50 characters',
        statusCode: 400,
      });
    }

    return await this.service.hasActiveByCreator(id_company, trimmed, id_entity);
  }
}
