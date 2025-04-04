## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Graphql playground

The graphql playground is available at: `http://localhost:3000/graphql`

## Example queries

### Get all tasks

```graphql
query {
  getAllTasks {
    id
    title
    description
    status
  }
}
```

### Get one task

```graphql
query {
  getTask(id: "a46e1bb9-5193-4d98-b182-3808fe263f36") {
    id
    title
    description
    status
  }
}
```

### Create task

```graphql
mutation {
  createTask(
    createTaskInput: {
      title: "My task"
      description: "My description"
      status: IN_PROGRESS
    }
  ) {
    status
    task {
      id
      title
      description
      status
    }
  }
}
```

### Update task

```graphql
mutation {
  updateTask(
    id: "a46e1bb9-5193-4d98-b182-3808fe263f36"
    updateTaskInput: {
      title: "new title"
      description: "new description"
      status: DONE
    }
  ) {
    status
    task {
      title
      description
      status
    }
  }
}
```

### Delete task

```graphql
mutation {
  deleteTask(id: "a46e1bb9-5193-4d98-b182-3808fe263f36") {
    status
  }
}
```

### Updated task subscription

```graphql
subscription {
  taskUpdated {
    id
    title
    description
    status
  }
}
```
