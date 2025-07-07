import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { PostagemService } from '../services/postagem.service';
import { Postagem } from './../entities/postagem.entity';
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

@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller('/postagens') // Define a rota base do controller como /postagens
@ApiBearerAuth()
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {} // Injeta o PostagemService

  @Get() // Rota GET /postagens
  @HttpCode(HttpStatus.OK) // Retorna status 200
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll(); // Chama o método do service que busca todas as postagens
  }

  @Get('/:id') // Rota GET /postagens/:id
  @HttpCode(HttpStatus.OK) // Retorna status 200
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id); // Busca uma postagem pelo ID (convertido para número)
  }

  @Get('/titulo/:titulo') // Rota GET /postagens/titulo/:titulo
  @HttpCode(HttpStatus.OK) // Retorna status 200
  findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findAllByTitulo(titulo); // Busca postagens que contenham o título informado
  }

  @Post() // Rota POST /postagens
  @HttpCode(HttpStatus.CREATED) // Retorna status 201 (Criado)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem); // Cria uma nova postagem com os dados do corpo da requisição
  }

  @Put() // Rota PUT /postagens
  @HttpCode(HttpStatus.OK) // Retorna status 200
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem); // Atualiza uma postagem com os dados do corpo
  }

  @Delete('/:id') // Rota DELETE /postagens/:id
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna status 204 (sem conteúdo)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postagemService.delete(id); // Exclui uma postagem pelo ID
  }
}
