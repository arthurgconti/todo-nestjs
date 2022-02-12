import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ id: '1', task: 'task-1', isDone: 0 }),
  new TodoEntity({ id: '2', task: 'task-2', isDone: 0 }),
  new TodoEntity({ id: '3', task: 'task-3', isDone: 0 }),
];

const newTodoEntity = new TodoEntity({ task: 'new-task', isDone: 0 });

const updatedTodoEntity = new TodoEntity({ task: 'task-1', isDone: 1 });

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            create: jest.fn().mockResolvedValue(newTodoEntity),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            update: jest.fn().mockResolvedValue(updatedTodoEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('index', () => {
    it('should return a todo list entity with succesfull', async () => {
      //arrange
      //act
      const result = await todoController.index();
      //assert
      expect(result).toEqual(todoEntityList);
      expect(todoService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      //arrange
      //spyon troca uma vez a função que já tava
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());

      //assert
      expect(todoController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should return a todoEntity', async () => {
      //Arrange
      const body: CreateTodoDto = { task: 'new-task', isDone: 0 };

      //Act
      const result = await todoController.create(body);

      //Assert
      expect(result).toEqual(newTodoEntity);
      expect(todoService.create).toHaveBeenCalledTimes(1);
      expect(todoService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an error', () => {
      //Arrange
      const body: CreateTodoDto = { task: 'new-task', isDone: 0 };
      //Act
      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());
      //Assert
      expect(todoService.create(body)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should return one todoEntity with succes', async () => {
      //Act
      const result = await todoController.show('1');
      //Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todoService.findOneOrFail).toBeCalledTimes(1);
      expect(todoService.findOneOrFail).toBeCalledWith('1');
    });
    it('should return error', async () => {
      //Arrange
      jest
        .spyOn(todoService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());
      //Assert
      expect(todoController.show('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo item successfully', async () => {
      //Arrange
      const body: UpdateTodoDto = { task: 'task-1', isDone: 1 };
      //Act
      const result = await todoController.update('1', body);
      //Assert
      expect(result).toEqual(updatedTodoEntity);
      expect(todoService.update).toHaveBeenCalledTimes(1);
      expect(todoService.update).toHaveBeenCalledWith('1', body);
    });

    it('should return an exception', () => {
      //Arrange
      const body: UpdateTodoDto = { task: 'task-1', isDone: 1 };
      jest.spyOn(todoService, 'update').mockRejectedValueOnce(new Error());

      //Assert
      expect(todoController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove a task succefully', async () => {
      //Act
      const result = await todoController.destroy('1');

      //Assert
      expect(result).toBeUndefined();
      expect(todoService.delete).toBeCalledTimes(1);
      expect(todoService.delete).toBeCalledWith('1');
    });

    it('should throw exception', () => {
      jest.spyOn(todoService, 'delete').mockRejectedValueOnce(new Error());
      expect(todoController.destroy('1')).rejects.toThrowError();
    });
  });
});
