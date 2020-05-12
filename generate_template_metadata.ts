import { fs } from "./deps.ts";
import { resolveDir } from "./util.ts";
const { writeJson } = fs;

const metadata = await resolveDir("./template");
await writeJson("./template.json", metadata);
