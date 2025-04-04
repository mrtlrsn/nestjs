import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TaskService } from './task.service';
import { AppModule } from '../app.module';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskStatus } from './enums/task-status';
import { TaskMutationResponse } from './dto/task-mutation-response.object';

const runQuery = (app: INestApplication, query: string, variables: {}) => {
  return request(app.getHttpServer()).post('/graphql').send({
    query,
    variables,
  });
};

describe('GraphQL Task', () => {
  let app: INestApplication;
  let taskService: TaskService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({}));
    await app.init();

    taskService = moduleFixture.get<TaskService>(TaskService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('#createTask', () => {
    const createTaskInput: CreateTaskInput = {
      title: 'My Task',
      description: 'This is my task',
      status: TaskStatus.IN_PROGRESS,
    };
    const query = `
    mutation CreateTask($createTaskInput: CreateTaskInput!) {
      createTask(createTaskInput: $createTaskInput) {
        status
        task {
          id
          title
          description
          status
        }
      }
    }
  `;
    it('should create a task', async () => {
      const variables = createTaskInput;

      const {
        body: { data },
      } = await runQuery(app, query, { createTaskInput });
      const { createTask } = data;
      const { status, task }: TaskMutationResponse = createTask;

      expect(status).toEqual('created');
      expect(task).toBeDefined();

      if (task) {
        expect(task.title).toEqual('My Task');
        expect(task.description).toEqual('This is my task');
        expect(task.status).toEqual(TaskStatus.IN_PROGRESS);
      }
    });

    it('should not create a task if description is empty', async () => {
      createTaskInput.description = '';

      const variables = createTaskInput;

      const {
        body: { errors },
      } = await runQuery(app, query, { createTaskInput });
      const error = errors.at(0).extensions.originalError;

      expect(error.message).toEqual(['description should not be empty']);
    });
  });
});
