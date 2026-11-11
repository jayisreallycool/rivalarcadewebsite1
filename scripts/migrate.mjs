// Applies db/schema.sql (idempotent). Usage: DATABASE_URL=... npm run db:migrate
import fs from 'node:fs';
import postgres from 'postgres';

const url = process.env.DATABASE_URL;
if (!url) { console.error('Set DATABASE_URL first.'); process.exit(1); }
const local = /localhost|127\.0\.0\.1/.test(url);
const sql = postgres(url, { ssl: local || process.env.DATABASE_SSL === 'disable' ? false : 'require', max: 1, onnotice: () => {} });
await sql.unsafe(fs.readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8'));
console.log('Schema is up to date.');
await sql.end();
