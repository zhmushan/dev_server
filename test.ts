import { assertEquals } from "./dev_deps.ts";
import { resolveDir } from "./util.ts";
const { test, readTextFile } = Deno;

test("template.json", async function () {
  const metadata = await resolveDir("./template");
  assertEquals(metadata, JSON.parse(await readTextFile("./template.json")));
});
