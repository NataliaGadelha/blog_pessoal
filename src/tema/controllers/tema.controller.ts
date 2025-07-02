import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Tema } from '../entities/tema.entity';
import { TemaService } from '../services/tema.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/temas') // Define a rota base do controller como /temas
export class TemaController {
  constructor(private readonly temaService: TemaService) {} // Injeta o TemaService no controller

  @Get() // Rota GET /temas
  @HttpCode(HttpStatus.OK) // Responde com status 200
  findAll(): Promise<Tema[]> {
    return this.temaService.findAll(); // Chama o service para listar todos os temas
  }

  @Get('/:id') // Rota GET /temas/:id
  @HttpCode(HttpStatus.OK) // Responde com status 200
  findById(@Param('id', ParseIntPipe) id: number): Promise<Tema> {
    return this.temaService.findById(id); // Busca tema pelo ID, convertendo o parâmetro para número
  }

  @Get('/descricao/:descricao') // Rota GET /temas/descricao/:descricao
  @HttpCode(HttpStatus.OK) // Responde com status 200
  findAllBydescricao(@Param('descricao') descricao: string): Promise<Tema[]> {
    return this.temaService.findAllByDescricao(descricao); // Busca temas que contenham a descrição
  }

  @Post() // Rota POST /temas
  @HttpCode(HttpStatus.CREATED) // Responde com status 201 (Criado)
  create(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.create(tema); // Cria um novo tema com os dados da requisição
  }

  @Put() // Rota PUT /temas
  @HttpCode(HttpStatus.OK) // Responde com status 200
  update(@Body() tema: Tema): Promise<Tema> {
    return this.temaService.update(tema); // Atualiza um tema com os dados recebidos
  }

  @Delete('/:id') // Rota DELETE /temas/:id
  @HttpCode(HttpStatus.NO_CONTENT) // Responde com status 204 (sem conteúdo)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.temaService.delete(id); // Exclui o tema com o ID fornecido
  }
}
