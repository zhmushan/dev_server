import { writeJson } from "https://deno.land/std@v1.0.0-rc1/fs/mod.ts";
import { resolveDir } from "./util.ts";

const metadata = await resolveDir("./template");
await writeJson("./template.json", metadata);
