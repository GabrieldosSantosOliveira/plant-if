import { Express, Router } from "express";
import { readdirSync, statSync } from "fs";
import { resolve } from "path";
const router = Router();
const getAllFilesFromFoldersAndSubfolders = (
  path: string,
  files: string[] = [],
): string[] => {
  const filenames = readdirSync(path);
  for (const file of filenames) {
    const stats = statSync(resolve(path, file));
    if (stats.isDirectory()) {
      getAllFilesFromFoldersAndSubfolders(resolve(path, file), files);
    } else {
      files.push(resolve(path, file));
    }
  }
  return files;
};

export async function setupRoutes(app: Express) {
  app.use("/api", router);
  const filenames = getAllFilesFromFoldersAndSubfolders(
    resolve(__dirname, "..", "routes"),
  );
  for (const file of filenames) {
    const route = await import(file);
    route.default(router);
  }
}
