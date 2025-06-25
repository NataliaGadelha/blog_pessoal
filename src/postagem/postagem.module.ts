import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controller';
import { TemaModule } from '../tema/tema.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Postagem]), // Registra o repositório da entidade Postagem
    TemaModule, // Importa o TemaModule para poder usar o TemaService no PostagemService
  ],
  providers: [PostagemService], // Declara o PostagemService como provedor injetável
  controllers: [PostagemController], // Registra o controller responsável pelas rotas HTTP
  exports: [],
})
export class PostagemModule {} // Declaração do módulo de postagens
