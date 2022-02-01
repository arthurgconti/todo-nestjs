import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  task: string;

  @ApiProperty()
  @Column({ name: 'is_done', type: 'smallint', width: 1 })
  idDone: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
