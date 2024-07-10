import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",
  out: "./src/lib/server/db/migrations",
  dialect: "sqlite", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.DB_PATH as string,
  },
  verbose: true,
  strict: true,
});
