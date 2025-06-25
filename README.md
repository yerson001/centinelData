

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


# RUN DOCKER WITH POSTGRES
```bash
$ docker-compose up -d
$ docker-compose down
$ docker-compose logs -f postgres
$ docker-compose exec postgres bash
$ psql -h localhost my_db -U root
$ docker ps --> get ip
$ docker inspect 8af0f7ea32ab
```

# RUN POSGRESQL

```bash
$ http://localhost:5050/
$ user: root@admin.com
$ password: char5524
$ Servers -> Register -> Server 
$ Name -> my_db General -> postgres:13  "IPAddress": "172.18.0.3",
hostname -I
```