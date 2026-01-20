import { Pool, QueryResultRow } from "pg";

class SQLConnector {
  private static instance: SQLConnector;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "1111",
      database: process.env.DB_NAME || "vayu-db",
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on("connect", () => {
      console.log("PostgreSQL connected successfully!");
    });

    this.pool.on("error", (err) => {
      console.error("PostgreSQL connection error:", err);
      process.exit(1);
    });
  }

  static getInstance(): SQLConnector {
    if (!SQLConnector.instance) {
      SQLConnector.instance = new SQLConnector();
    }
    return SQLConnector.instance;
  }

  async query<T extends QueryResultRow = any>(
    text: string,
    params?: any[],
  ): Promise<T[]> {
    try {
      const start = Date.now();
      const res = await this.pool.query<T>(text, params);
      const duration = Date.now() - start;
      console.log(`Executed query: "${text}" in ${duration}ms`);
      return res.rows;
    } catch (error) {
      console.error(`Query error: "${text}"`, error);
      throw error;
    }
  }

  async close() {
    await this.pool.end();
    console.log("PostgreSQL connection pool closed.");
  }
}

export const sqlConnector = SQLConnector.getInstance();
