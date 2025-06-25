import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Tema } from '../entities/tema.entity';

@Injectable() // Define esta classe como um provider que pode ser injetado em outros lugares
export class TemaService {
  constructor(
    @InjectRepository(Tema) // Injeta automaticamente o repositório da entidade Tema
    private temaRepository: Repository<Tema>, // Permite executar operações no banco para a entidade Tema
  ) {}

  async findAll(): Promise<Tema[]> {
    return await this.temaRepository.find({
      relations: {
        postagem: true, // Inclui as postagens relacionadas ao retornar os temas
      },
    });
  }

  async findById(id: number): Promise<Tema> {
    const tema = await this.temaRepository.findOne({
      where: {
        id, // Busca o tema pelo ID
      },
      relations: {
        postagem: true, // Carrega as postagens relacionadas
      },
    });

    if (!tema)
      // Se não encontrar o tema...
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND); // ...lança exceção 404

    return tema; // Retorna o tema encontrado
  }

  async findAllByDescricao(descricao: string): Promise<Tema[]> {
    return await this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`), // Busca por descrição com case-insensitive e LIKE
      },
      relations: {
        postagem: true, // Inclui as postagens no resultado
      },
    });
  }

  async create(Tema: Tema): Promise<Tema> {
    return await this.temaRepository.save(Tema); // Salva o novo tema no banco
  }

  async update(tema: Tema): Promise<Tema> {
    await this.findById(tema.id); // Verifica se o tema existe antes de atualizar

    return await this.temaRepository.save(tema); // Salva as alterações do tema
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id); // Verifica se o tema existe antes de excluir

    return await this.temaRepository.delete(id); // Exclui o tema pelo ID
  }
}
