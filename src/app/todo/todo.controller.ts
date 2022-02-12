import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from '../../helpers/swagger/not-found.swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { ShowTodoSwagger } from './swagger/show-todo.swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { TodoService } from './todo.service';

@Controller('api/v1/todos')
@ApiTags('Todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as tasks a serem feitas' })
  @ApiResponse({
    status: 200,
    description: 'Listagem efetuada com sucesso!',
    type: IndexTodoSwagger,
    isArray: true,
  })
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Nova task criada com sucesso!',
    type: CreateTodoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos!',
    type: BadRequestSwagger,
  })
  @ApiOperation({ summary: 'Adicionar uma nova task' })
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Dados de uma task retornado com sucesso!',
    type: ShowTodoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos!',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Task não encontrada',
    type: NotFoundSwagger,
  })
  @ApiOperation({ summary: 'Listar uma task específica pelo id' })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Alterar informações de uma task específica pelo id',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados da task atualizados com sucesso!',
    type: UpdateTodoSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Task não encontrada',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  //Status 204
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma task específica pelo id' })
  @ApiResponse({
    status: 204,
    description: 'Task removida com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Task não encontrada',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.delete(id);
  }
}
