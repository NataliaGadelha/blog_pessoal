import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entity';
import { TemaController } from './controllers/tema.controller';
import { TemaService } from './services/tema.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tema])], // Importa o repositório da entidade Tema para injeção no service
  controllers: [TemaController], // Registra o TemaController para expor as rotas HTTP
  providers: [TemaService], // Registra o TemaService como provider, necessário para injeção e exportação
  exports: [TemaService], // Exporta o TemaService para ser usado em outros módulos (resolve o erro UnknownExportException)
})
export class TemaModule {} // Declara o módulo TemaModule
