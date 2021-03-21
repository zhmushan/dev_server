import { resolveDir } from "./util.ts";

const { writeTextFile } = Deno;

const metadata = await resolveDir("./template");
await writeTextFile("./template.json", JSON.stringify(metadata));
