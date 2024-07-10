import { DB_PATH } from "$env/static/private";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database(DB_PATH);

export const db = drizzle(sqlite, { schema });
