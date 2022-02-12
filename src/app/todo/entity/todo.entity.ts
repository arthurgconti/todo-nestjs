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
  isDone: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(todo?: Partial<TodoEntity>) {
    this.id = todo?.id;
    this.task = todo?.task;
    this.isDone = todo?.isDone;
    this.createdAt = todo?.createdAt;
    this.updatedAt = todo?.updatedAt;
    this.deletedAt = todo?.deletedAt;
  }
}
