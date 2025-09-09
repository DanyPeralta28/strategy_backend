import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { FormatFaceService } from './format_face.service';
import { CreateFormatFaceDto } from './dto/create-format_face.dto';
import { UpdateFormatFaceDto } from './dto/update-format_face.dto';
import { BulkCreateFormatFaceDto } from './dto/bulk-create-format_face.dto';

@ApiTags('EXECUTION - Format Face')
@Controller('format-face')
export class FormatFaceController {
  constructor(private readonly service: FormatFaceService) {}

  @Post()
  @ApiOperation({ summary: 'Bulk create Format Face records ' })
  @ApiBody({
    type: BulkCreateFormatFaceDto,
    description: 'Inserta múltiples filas en una sola operación (transacción atómica).',
  })
  @ApiResponse({
    status: 201,
    description: 'Format Face records created successfully',
    schema: { example: { data: { ids: [12, 13], inserted: 2 }, message: 'OK', statusCode: 201 } },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: { example: { data: null, message: 'No items to insert', statusCode: 400 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async createMany(@Body() dto: BulkCreateFormatFaceDto) {
    return await this.service.createMany(dto);
  }
  // ============================================================

  @Get('visible/:id_company/:requester_user_id')
  @ApiOperation({ summary: 'Get visible Format Face for the requester (bosses/admins/teammates/self)' })
  @ApiParam({ name: 'id_company', required: true, example: 'Scalingsoft' })
  @ApiParam({ name: 'requester_user_id', required: true, example: 13474 })
  @ApiResponse({
    status: 200,
    description: 'Format Face records visible to the requester',
    schema: {
      example: {
        data: [
          {
            id: 2,
            function_name: 'Collections',
            accountable_name: 'James Smith',
            kpi_list: [{ kpi: 'Collection Rate', target: 90 }],
            results_list: [{ month: '2025-09', result: 91 }],
            created_by: 'admin_user',
            status: 1,
            created_at: '02/09/2025 20:33:20',
            id_company: 'Scalingsoft',
          },
          {
            id: 3,
            function_name: 'Reconciliation',
            accountable_name: 'John Doe',
            kpi_list: [{ kpi: 'On-time Delivery', target: 95 }],
            results_list: [{ month: '2025-08', result: 96 }],
            created_by: '13474',
            status: 1,
            created_at: '06/09/2025 10:38:56',
            id_company: 'Scalingsoft',
          },
        ],
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: { example: { data: null, message: 'requester_user_id must be numeric', statusCode: 400 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'User not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async findVisible(
    @Param('id_company') id_company: string,
    @Param('requester_user_id') requester_user_id: string,
  ) {
    const uid = Number(requester_user_id);
    if (!Number.isFinite(uid)) {
      throw new HttpException(
        { data: null, message: 'requester_user_id must be numeric', statusCode: 400 },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.service.findAll(id_company, uid);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Format Face record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiResponse({
    status: 200,
    description: 'Format Face found',
    schema: {
      example: {
        data: {
          id: 12,
          id_company: 'Scalingsoft',
          function_name: 'Reconciliation',
          accountable_name: 'John Doe',
          kpi_list: [{ kpi: 'On-time Delivery', target: 95 }],
          results_list: [{ month: '2025-08', result: 96 }],
          status: 1,
          created_by: 'admin_user',
          created_at: '2025-08-11T08:33:00.000Z',
        },
        message: 'OK',
        statusCode: 200,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Format Face not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Format Face record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiBody({
    schema: {
      example: {
        function_name: 'Collections',
        accountable_name: 'Jane Smith',
        kpi_list: [{ kpi: 'Collection Rate', target: 90 }],
        results_list: [{ month: '2025-09', result: 91 }],
        status: 1,
        created_by: 'admin_user',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Format Face updated successfully',
    schema: { example: { data: { id: 12 }, message: 'OK', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Format Face not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFormatFaceDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete a Format Face record by ID' })
  @ApiParam({ name: 'id', type: Number, example: 12 })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
    schema: { example: { data: { id: 12 }, message: 'Deleted successfully', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Format Face not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(id);
  }
}
