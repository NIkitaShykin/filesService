# Files Service

Project was created as a solution for a task for a job. It has code which contains ways to implement authorization and REST API to interact with files

## Setting up project

### Using local environment

1. You need to make sure that you have Node and MySQL server installed on your local env.
2. Pull this repository and install it's dependencies

```console
$ npm i
```

3. Create .env file at exmaple of [this file](.env.example.local)

| Field                   | Type   | Description                                                        |
| ----------------------- | ------ | ------------------------------------------------------------------ |
| NODE_LOCAL_PORT         | number | Port which you want to use for application (3000 is default value) |
| JWT_SECRET              | string | Secret which will be user for creatrion of JWT tokens              |
| MULTER_DESTINATION_PATH | string | Path for local storage of files                                    |
| DB_HOST                 | string | Host of your database                                              |
| DB_PORT                 | number | Port of your database                                              |
| DB_USER                 | string | User to interact with your database                                |
| DB_PASSWORD             | string | Password for this user                                             |
| DB_NAME                 | string | Name of database                                                   |

4. Build and start project

```console
$ npm run build
$ npm run start
```

### Using docker

1. You need to make sure that you have Docker installed on your machine and docker engine is running
2. Pull this repository
3. Create .env file at exmaple of [this file](.env.example.docker)

| Field                   | Type   | Description                                                        |
| ----------------------- | ------ | ------------------------------------------------------------------ |
| NODE_LOCAL_PORT         | number | Port which you want to use for application (3000 is default value) |
| NODE_DOCKER_PORT        | number | Port which docker container should use for application             |
| JWT_SECRET              | string | Secret which will be user for creatrion of JWT tokens              |
| MULTER_DESTINATION_PATH | string | Path for local storage of files                                    |
| MYSQLDB_HOST            | string | Host of your database                                              |
| MYSQLDB_USER            | string | User to interact with your database                                |
| MYSQLDB_ROOT_PASSWORD   | string | Password for this user                                             |
| MYSQLDB_LOCAL_PORT      | number | Port at local machine to connect to database                       |
| MYSQLDB_DOCKER_PORT     | number | Port which docker container will use for mysql                     |

4. Build and start project

```console
$ npm run build:docker
$ npm run start:docker
```
