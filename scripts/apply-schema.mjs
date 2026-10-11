import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL);
const statements = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8")
  .split(";")
  .map((s) => s.replace(/^\s*--.*$/gm, "").trim())
  .filter(Boolean);

for (const statement of statements) await sql.query(statement);
console.log(`applied ${statements.length} statements`);
