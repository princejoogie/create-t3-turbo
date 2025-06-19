import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not set");
}

export const db = drizzle(process.env.POSTGRES_URL, {
  schema,
  casing: "snake_case",
});
