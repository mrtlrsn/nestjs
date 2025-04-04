import { Test, TestingModule } from '@nestjs/testing';
import { TaskResolver } from './task.resolver';
import { TaskStatus } from './enums/task-status';
import { TaskService } from './task.service';
import { Task } from './models/task.model';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

const mockTaskService = {
  findAll: jest.fn(() => [
    {
      id: '1',
      title: 'First task',
      description: 'My first task',
      status: TaskStatus.DONE,
    },
    {
      id: '2',
      title: 'Second task',
      description: 'My second task',
      status: TaskStatus.TO_DO,
    },
  ]),
  findOne: jest.fn((id: string) => {
    const tasks: Record<string, Task> = {
      '1': {
        id: '1',
        title: 'First task',
        description: 'My first task',
        status: TaskStatus.DONE,
      },
      '2': {
        id: '2',
        title: 'Second task',
        description: 'My second task',
        status: TaskStatus.TO_DO,
      },
    };

    return tasks[id];
  }),
  create: jest.fn((createTaskInput) => ({
    id: '3',
    ...createTaskInput,
  })),
  update: jest.fn((id, updateTaskInput) => {
    if (id !== '2') return undefined;

    return {
      id,
      title: 'Updated task',
      description: 'Updated description',
      status: updateTaskInput.status || TaskStatus.IN_PROGRESS,
    };
  }),
  remove: jest.fn((id: string) => {
    if (id !== '1') return undefined;

    return {
      id: '1',
      title: 'First task',
      description: 'My first task',
      status: TaskStatus.DONE,
    };
  }),
};

describe('TaskResolver', () => {
  let resolver: TaskResolver;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskResolver,
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    resolver = module.get<TaskResolver>(TaskResolver);
  });

  afterEach(() => jest.restoreAllMocks());

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('#getAllTasks', () => {
    it('gets all tasks', () => {
      const tasks = resolver.getAllTasks();

      expect(tasks).toEqual([
        {
          id: '1',
          title: 'First task',
          description: 'My first task',
          status: TaskStatus.DONE,
        },
        {
          id: '2',
          title: 'Second task',
          description: 'My second task',
          status: TaskStatus.TO_DO,
        },
      ]);
    });
  });

  describe('#getTask', () => {
    it('gets one fask', () => {
      const taks = resolver.getTask('1');

      expect(taks).toEqual({
        id: '1',
        title: 'First task',
        description: 'My first task',
        status: TaskStatus.DONE,
      });
    });
  });

  describe('#createTask', () => {
    it('creates one task', () => {
      const createTaskInput: CreateTaskInput = {
        title: 'New Task',
        description: 'New Description',
        status: TaskStatus.TO_DO,
      };

      const result = resolver.createTask(createTaskInput);

      expect(result).toEqual({
        status: 'created',
        task: {
          id: '3',
          title: 'New Task',
          description: 'New Description',
          status: TaskStatus.TO_DO,
        },
      });
    });
  });

  describe('#updateTask', () => {
    const updateTaskInput: UpdateTaskInput = {
      title: 'Updated task',
      description: 'Updated description',
      status: TaskStatus.IN_PROGRESS,
    };

    it('updates one task', () => {
      const result = resolver.updateTask('2', updateTaskInput);

      expect(result).toEqual({
        status: 'updated',
        task: {
          id: '2',
          title: 'Updated task',
          description: 'Updated description',
          status: TaskStatus.IN_PROGRESS,
        },
      });
    });

    it('returns taks not found', () => {
      const result = resolver.updateTask('3', updateTaskInput);

      expect(result).toEqual({
        status: 'task not found',
      });
    });
  });

  describe('#deleteTask', () => {
    it('deletes one task', () => {
      const result = resolver.deleteTask('1');

      expect(result).toEqual({
        status: 'deleted',
        task: {
          id: '1',
          title: 'First task',
          description: 'My first task',
          status: TaskStatus.DONE,
        },
      });
    });

    it('returns taks not found', () => {
      const result = resolver.deleteTask('3');

      expect(result).toEqual({
        status: 'task not found',
      });
    });
  });
});
