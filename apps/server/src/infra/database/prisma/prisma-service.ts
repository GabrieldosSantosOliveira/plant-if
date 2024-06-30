import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  private static _instance: PrismaService | null = null;
  private constructor() {
    super();
  }

  public static getInstance(): PrismaService {
    if (this._instance === null) {
      this._instance = new PrismaService();
    }
    return this._instance;
  }
}
