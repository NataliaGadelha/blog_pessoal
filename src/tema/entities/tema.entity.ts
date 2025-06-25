import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_temas' }) // Define a tabela no banco com o nome "tb_temas"
export class Tema {
  @PrimaryGeneratedColumn() // Gera o ID automaticamente como chave primária
  id: number;

  @IsNotEmpty() // Valida que a descrição não pode ser nula ou vazia
  @Column({ length: 255, nullable: false }) // Define a coluna com no máximo 255 caracteres e obrigatória
  descricao: string;

  @OneToMany(() => Postagem, (postagem) => postagem.tema) // Relacionamento 1:N com Postagem (um tema para várias postagens)
  postagem: Postagem[]; // Lista de postagens associadas a esse tema
}
