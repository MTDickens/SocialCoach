// The project pins @types/node 20, which predates node:sqlite. The account
// tests run the real migration on it, so declare the three calls they use.
declare module "node:sqlite" {
  export class DatabaseSync {
    constructor(path: string);
    exec(sql: string): void;
    prepare(sql: string): { get(...values: unknown[]): Record<string, unknown> | undefined; all(...values: unknown[]): Record<string, unknown>[]; run(...values: unknown[]): unknown };
  }
}
