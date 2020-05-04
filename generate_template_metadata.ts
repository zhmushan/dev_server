import { writeJson } from "https://deno.land/std@v0.42.0/fs/mod.ts";
import { resolveDir } from "./util.ts";

const metadata = await resolveDir("./template");
await writeJson("./template.json", metadata);
