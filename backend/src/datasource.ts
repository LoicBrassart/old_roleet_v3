import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const dataSource = new DataSource({
  // type: "sqlite",
  // database: "./data/db.sqlite",
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: ["src/entities/*.ts"],
  synchronize: false,
  migrations: ["data/*.ts"],
  migrationsTableName: "migrations",
});
