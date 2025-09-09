// cash-format-optcash.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CashFormatOptcashService } from './format_optcash.service';
import { CreateCashFormatOptcashDto } from './dto/create-format_optcash.dto';
import { UpdateCashFormatOptcashDto } from './dto/update-format_optcash.dto';
import { CashFormatOptcash } from './entities/format_optcash.entity';

@ApiTags('CASH - Format Optcash')
@Controller('cash-format-optcash')
export class CashFormatOptcashController {
  constructor(private readonly service: CashFormatOptcashService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Optcash format record' })
  @ApiBody({
    schema: {
      example: {
        id_company: 'Scalingsoft',
        ideas: [
          {
            letter: 'A',
            title: 'Ideas para mejorar el Ciclo de Ventas',
            items: [
              { idea: 'Mejorar lead scoring', reduction: '', errors: '', gap: '' },
              { idea: 'Automatizar follow-ups', reduction: '', errors: '', gap: '' },
              { idea: 'Dashboard de conversión', reduction: '', errors: '', gap: '' }
            ],
            editing: false
          },
          {
            letter: 'B',
            title: 'Eficiencia en producción e inventario',
            items: [
              { idea: 'Kanban en planta', reduction: '', errors: '', gap: '' },
              { idea: 'Reorden automático de insumos', reduction: '', errors: '', gap: '' },
              { idea: 'Clasificación ABC', reduction: '', errors: '', gap: '' }
            ],
            editing: false
          },
          {
            letter: 'C',
            title: 'Entrega y distribución',
            items: [
              { idea: 'Ruteo con ventanas de tiempo', reduction: '', errors: '', gap: '' },
              { idea: 'Trackeo en tiempo real', reduction: '', errors: '', gap: '' },
              { idea: 'Acuerdos con 3PL', reduction: '', errors: '', gap: '' }
            ],
            editing: false
          },
          {
            letter: 'D',
            title: 'Facturación y cobro',
            items: [
              { idea: 'Recordatorios automáticos', reduction: '', errors: '', gap: '' },
              { idea: 'Descuentos por pronto pago', reduction: '', errors: '', gap: '' },
              { idea: 'Conciliación con gateway', reduction: '', errors: '', gap: '' }
            ],
            editing: false
          }
        ],
        status: 1,
        created_by: 'admin_user'
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Optcash format created successfully',
    schema: { example: { data: { id: 7 }, message: 'OK', statusCode: 201 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async create(@Body() dto: CreateCashFormatOptcashDto) {
    return await this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Optcash records for a company' })
  @ApiQuery({ name: 'id_company', required: true, example: 'Scalingsoft' })
  @ApiResponse({
    status: 200,
    description: 'Optcash formats retrieved',
    schema: {
      example: {
        data: [{
          id: 7,
          id_company: 'Scalingsoft',
          idea_a_list: [
            { idea: 'Mejorar lead scoring', reduction: '', errors: '', gap: '' }
          ],
          idea_b_list: [],
          idea_c_list: [],
          idea_d_list: [],
          // formato unificado
          ideas: [
            {
              letter: 'A',
              title: 'Ideas para mejorar el Ciclo de Ventas',
              items: [
                { idea: 'Mejorar lead scoring', reduction: '', errors: '', gap: '' }
              ],
              editing: false
            }
            // B, C, D…
          ],
          status: 1,
          created_by: 'admin_user',
          created_at: '2025-08-11T08:33:00.000Z'
        }],
        message: 'OK',
        statusCode: 200
      }
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async findAll(@Query('id_company') id_company: string) {
    return await this.service.findAll(id_company);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an Optcash format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 7 })
  @ApiResponse({
    status: 200,
    description: 'Optcash format found',
    schema: {
      example: {
        data: {
          id: 7,
          id_company: 'Scalingsoft',
          idea_a_list: [
            { idea: 'Mejorar lead scoring', reduction: '', errors: '', gap: '' }
          ],
          idea_b_list: [],
          idea_c_list: [],
          idea_d_list: [],
          ideas: [
            {
              letter: 'A',
              title: 'Ideas para mejorar el Ciclo de Ventas',
              items: [
                { idea: 'Mejorar lead scoring', reduction: '', errors: '', gap: '' }
              ],
              editing: false
            }
            // B, C, D…
          ],
          status: 1,
          created_by: 'admin_user',
          created_at: '2025-08-11T08:33:00.000Z'
        },
        message: 'OK',
        statusCode: 200
      }
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Optcash format not found', statusCode: 404 } },
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
  @ApiOperation({ summary: 'Update an Optcash format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 7 })
  @ApiBody({
    schema: {
      example: {
        ideas: [
          {
            letter: 'A',
            title: 'Ideas para mejorar el Ciclo de Ventas',
            items: [
              { idea: 'Calificar MQL/SQL', reduction: '', errors: '', gap: '' },
              { idea: 'Cadencia de emails', reduction: '', errors: '', gap: '' },
            ],
            editing: false
          },
          {
            letter: 'B',
            title: 'Optimizar costos de producción',
            items: [
              { idea: 'Negociar con proveedores', reduction: '', errors: '', gap: '' },
            ],
            editing: false
          },
          {
            letter: 'C',
            title: 'Mejorar ruteo de distribución',
            items: [
              { idea: 'Ruteo con ventanas de tiempo', reduction: '', errors: '', gap: '' },
            ],
            editing: false
          },
          {
            letter: 'D',
            title: 'Reducir DSO',
            items: [
              { idea: 'Recordatorios automáticos', reduction: '', errors: '', gap: '' },
              { idea: 'Pronto pago', reduction: '', errors: '', gap: '' }
            ],
            editing: false
          }
        ],
        status: 1,
        created_by: 'admin_user'
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Optcash format updated successfully',
    schema: { example: { data: { id: 7 }, message: 'OK', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Optcash format not found', statusCode: 404 } },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error',
    schema: { example: { data: null, message: 'Internal Server Error: <details>', statusCode: 500 } },
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCashFormatOptcashDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logically delete an Optcash format by ID' })
  @ApiParam({ name: 'id', type: Number, example: 7 })
  @ApiResponse({
    status: 200,
    description: 'Deleted',
    schema: { example: { data: { id: 7 }, message: 'Deleted successfully', statusCode: 200 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
    schema: { example: { data: null, message: 'Optcash format not found', statusCode: 404 } },
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
