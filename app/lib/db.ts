import { queryDatabase, initDatabase as initDb } from './db-adapter';

// Initialize database on server startup
if (typeof process !== 'undefined') {
  initDb().catch(console.error);
}

/**
 * Execute SQL query via adapter
 * This prevents client-side pg dependency issues in Next.js
 */
export async function query(text: string, params?: any[]) {
  return queryDatabase(text, params);
}

// Database initialization function
export async function initDatabase() {
  return initDb();
}
