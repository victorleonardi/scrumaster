import "reflect-metadata"
import { DataSource } from "typeorm"

import { Project } from "./database/models/Project"
import { Section } from "./database/models/Section"
import { User } from "./database/models/User"
import { Vote } from "./database/models/Vote"

// TODO: change to .env
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: [Project, Section, User, Vote],
  migrations: [],
  synchronize: true
})

export async function initDB() {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
}