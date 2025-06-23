import { PostagemService } from '../services/postagem.service';
import { Postagem } from './../entities/postagem.entity';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('/postagens')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll();
  }
}
