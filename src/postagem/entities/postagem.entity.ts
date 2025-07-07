import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' }) // Define o nome da tabela no banco como "tb_postagens"
export class Postagem {
  @ApiProperty()
  @PrimaryGeneratedColumn() // Cria uma coluna 'id' com auto incremento (chave primária)
  id: number;

  @ApiProperty()
  @IsNotEmpty() // Valida que o campo 'titulo' não pode ser vazio
  @Column({ length: 100, nullable: false }) // Define a coluna 'titulo' com no máximo 100 caracteres, obrigatória
  titulo: string;

  @ApiProperty()
  @IsNotEmpty() // Valida que o campo 'texto' não pode ser vazio
  @Column({ length: 1000, nullable: false }) // Define a coluna 'texto' com no máximo 1000 caracteres, obrigatória
  texto: string;

  @ApiProperty()
  @UpdateDateColumn() // Gera automaticamente a data/hora da última atualização
  data: Date;

  @ApiProperty({ type: () => Tema })
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    // Relacionamento N:1 com Tema
    onDelete: 'CASCADE', // Se o tema for excluído, todas as postagens relacionadas também serão excluídas
  })
  tema: Tema; // Referência à entidade Tema

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    // Relacionamento N:1 com Tema
    onDelete: 'CASCADE', // Se o usuário for excluído, todas as postagens relacionadas também serão excluídas
  })
  usuario: Usuario; // Referência à entidade Usuario
}
