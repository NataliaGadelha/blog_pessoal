import { TemaService } from './../../tema/services/tema.service';
import { Postagem } from './../entities/postagem.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable() // Permite que o serviço seja injetado em outros lugares
export class PostagemService {
  constructor(
    @InjectRepository(Postagem) // Injeta o repositório da entidade Postagem
    private postagemRepository: Repository<Postagem>, // Permite executar operações no banco com Postagem

    private temaService: TemaService, // Injeta o TemaService para validações de integridade referencial
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        tema: true, // Inclui o tema relacionado ao retornar as postagens
        usuario: true, // Inclui os dados do usuário vinculado
      },
    });
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id, // Busca a postagem pelo ID
      },
      relations: {
        tema: true, // Inclui o tema vinculado
        usuario: true, // Inclui os dados do usuário vinculado
      },
    });

    if (!postagem)
      // Se não encontrar a postagem...
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND); // ...lança exceção 404

    return postagem; // Retorna a postagem encontrada
  }

  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`), // Busca por título (case-insensitive, parcial)
      },
      relations: {
        tema: true, // Inclui os dados do tema vinculado
        usuario: true, // Inclui os dados do usuário vinculado
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    await this.temaService.findById(postagem.tema.id); // Verifica se o tema informado existe

    return await this.postagemRepository.save(postagem); // Salva a nova postagem no banco
  }

  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id); // Verifica se a postagem existe

    await this.temaService.findById(postagem.tema.id); // Verifica se o tema informado ainda existe

    return await this.postagemRepository.save(postagem); // Atualiza a postagem
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id); // Verifica se a postagem existe antes de deletar

    return await this.postagemRepository.delete(id); // Deleta a postagem do banco
  }
}
