import { DataSource } from "typeorm";
import { PostEntity } from "./entities/PostEntity";
import { AttractionImageEntity } from "./entities/AttractionImageEntity";


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'my_user',
  password: 'my_password',
  database: 'my_database',
  entities: [PostEntity,AttractionImageEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
  logging: true,
});