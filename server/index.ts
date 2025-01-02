import { initDB, AppDataSource } from "~/infra/database";

export default async () => {
  try {
    await initDB();
    if (AppDataSource.isInitialized) {
      console.log("Data Source has been initialized");
    }
  } catch (err) {
    console.error("Error during Data Source initialization", err);
  }
}