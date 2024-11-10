import { DataSource } from "typeorm";
import { PostEntity } from "./entities/PostEntity";
import { ImageEntity } from "./entities/AttractionImageEntity";


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number('5432'),
  username: 'my_user',
  password: 'my_password',
  database: 'my_database',
  entities: [PostEntity,ImageEntity],
  synchronize: true,
});