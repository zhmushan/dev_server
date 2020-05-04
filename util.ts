import type { DirMetadata } from "./types.ts";

import { join } from "https://deno.land/std@v0.42.0/path/mod.ts";
const { readDir } = Deno;

export async function resolveDir(p: string): Promise<DirMetadata> {
  const m: DirMetadata = {};
  for await (const entry of readDir(p)) {
    m[entry.name] = entry.isDirectory
      ? await resolveDir(join(p, entry.name))
      : 1;
  }
  return m;
}
